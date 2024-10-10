'use client';

import { Widget } from './widget/Widget';
import React, { ChangeEvent, useState } from 'react';
import { extractFacebookPageID } from './utils/extractFacebookPageID';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
  useDisclosure
} from '@nextui-org/react';
import { getInstallCode } from './utils/getInstallCode';

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [pageURL, setPageURL] = useState('');
  const [pageID, setPageID] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPageURL(e.target.value);

  const handleDone = () => {
    const pageID = extractFacebookPageID(pageURL);
    if (!pageURL || !pageID) {
      setIsError(true);
      setPageID('');
      return;
    }

    setPageID(pageID);
  };

  const handleResetError = () => setIsError(false);

  return (
    <div className="flex flex-col h-screen sm:flex-row">
      <div className="w-full sm:w-96 p-4 bg-gray-100">
        <div className="p-4 rounded-lg h-full text-black flex flex-col">
          <h3 className="font-semibold text-2xl mb-4">Settings Widget</h3>
          <Input
            type="text"
            label="Page URL or ID"
            variant="bordered"
            value={pageURL}
            isInvalid={isError}
            errorMessage="Please enter a valid URL"
            endContent={
              <Button
                size="sm"
                className="my-auto"
                onClick={handleDone}
                onBlur={handleResetError}
              >
                Done
              </Button>
            }
            onBlur={handleResetError}
            onChange={handleChange}
          />
          <Button
            color="success"
            fullWidth
            className="mt-auto"
            onPress={onOpen}
          >
            Get Code
          </Button>
        </div>
      </div>

      <div className="flex-1 p-4 bg-white overflow-auto place-content-center">
        <div className="flex justify-center items-center p-4 h-auto w-full">
          <Widget settings={{ pageID }} />
        </div>
      </div>

      <Modal size="4xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Installation Code
              </ModalHeader>
              <ModalBody>
                <Popover placement="bottom" showArrow={true}>
                  <PopoverTrigger>
                    <Textarea
                      maxRows={10}
                      value={getInstallCode({ pageID })}
                      readOnly
                      onClick={(e) => {
                        const target = e.target as HTMLTextAreaElement;

                        if (target) {
                          target.select();
                          document.execCommand('copy');
                        }
                      }}
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-1 py-2">
                      <div className="text-small font-bold">
                        Copied to clipboard
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
