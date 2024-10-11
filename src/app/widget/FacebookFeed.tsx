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
import { useSettings } from './providers';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { API_URL } from './constants';

export function FacebookFeed() {
  const { pageID } = useSettings();

  const { data, isError, isLoading } = useQuery({
    queryFn: async () => {
      const res = await fetch(
        `${API_URL}/api/posts?page=${encodeURIComponent(pageID)}`
      );
      return (await res.json()) as FacebookFeedResponse;
    },
    queryKey: ['facebook-feed', pageID],
    enabled: !!pageID,
    refetchOnWindowFocus: false
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (!pageID || isError || !data?.data?.length) {
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
