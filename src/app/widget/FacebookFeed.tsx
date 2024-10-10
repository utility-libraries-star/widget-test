import React from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Link,
  Spinner
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { FacebookFeedResponse } from './types';
import { useSettings, useToken } from './providers';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

export function FacebookFeed() {
  const { pageID } = useSettings();
  const { pages, isTokenLoading, isTokenError } = useToken();

  const isNotLoadedToken = !isTokenLoading && !isTokenError && !!pages.length;

  const { data, isError, isLoading } = useQuery({
    queryFn: async () => {
      const page = pages.find(
        (page) =>
          page.id === pageID ||
          page.name.replaceAll(' ', '').toLowerCase() ===
            pageID.replaceAll('-', '').toLowerCase()
      );

      if (!page) {
        throw new Error('No token');
      }

      const res = await fetch(
        `https://graph.facebook.com/v21.0/me/posts?fields=shares,message,id,full_picture,created_time,from,reactions.type%28LIKE%29.limit%280%29.summary%281%29.as%28reactions%29,permalink_url,attachments{media,target,description,media_type,title,type,unshimmed_url,url,subattachments},comments.limit%280%29.summary%281%29.as%28comments_count%29,reactions.type%28LIKE%29.limit%280%29.summary%281%29.as%28reactions_like%29,reactions.type%28LOVE%29.limit%280%29.summary%281%29.as%28reactions_love%29,reactions.type%28WOW%29.limit%280%29.summary%281%29.as%28reactions_wow%29,reactions.type%28HAHA%29.limit%280%29.summary%281%29.as%28reactions_haha%29,reactions.type%28SAD%29.limit%280%29.summary%281%29.as%28reactions_sad%29,reactions.type%28ANGRY%29.limit%280%29.summary%281%29.as%28reactions_angry%29,reactions.type%28THANKFUL%29.limit%280%29.summary%281%29.as%28reactions_thankful%29&locale=en&limit=10&access_token=${page.access_token}`
      );
      return (await res.json()) as FacebookFeedResponse;
    },
    queryKey: ['facebook-feed', pageID],
    enabled: !!pageID && isNotLoadedToken,
    refetchOnWindowFocus: false
  });

  if (isLoading || isTokenLoading) {
    return <Spinner />;
  }

  if (!pageID || isError || !data?.data?.length || !isNotLoadedToken) {
    return (
      <Card className="bg-red-500">
        <CardBody className="text-white">
          Error loading data. Please try again.
        </CardBody>
      </Card>
    );
  }

  return (
    <ResponsiveMasonry
      className="w-full h-full flex justify-center items-center p-8"
      columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
    >
      <Masonry gutter="24px">
        {data.data.map(({ id, permalink_url, attachments, message, from }) => {
          const { media, title } = attachments.data[0];
          return (
            <Link key={id} href={permalink_url} target="_blank">
              <Card fullWidth>
                <CardBody className="overflow-visible p-0">
                  {media.image.src && (
                    <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      alt={title}
                      className="w-full object-cover"
                      src={media.image.src}
                    />
                  )}
                </CardBody>
                <CardFooter className="text-small justify-between flex-col">
                  <b>{from.name}</b>
                  <p className="text-default-500">{message}</p>
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </Masonry>
    </ResponsiveMasonry>
  );
}
