import { ActionIcon, Box, Group, Image, Text } from '@mantine/core';
import { Dropzone, DropzoneProps, MIME_TYPES } from '@mantine/dropzone';
import { useState } from 'react';
import { MdInsertPhoto, MdOutlineUploadFile } from 'react-icons/md';

import { IconClose } from '@/components/icons/IconClose';

type Props = {
  imageUrl?: string;
} & Partial<DropzoneProps>;
export const FileDropzone = ({ imageUrl, ...props }: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [defaultImageUrl, setDefaultImageUrl] = useState<string | undefined>(imageUrl);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        alt={`プレビュー画像 ${index + 1}`}
        h='220px'
        key={index}
        src={imageUrl}
        w='auto'
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  });

  const handleReject = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setFiles([]);
    setDefaultImageUrl(undefined);
  };

  return (
    <>
      <Dropzone
        accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
        maxFiles={1}
        maxSize={5 * 1024 ** 2}
        mt={4}
        multiple={false}
        onDrop={(files) => setFiles(files)}
        onReject={() => setFiles([])}
        {...props}
      >
        <Group justify='center' mih={220} pos='relative'>
          {files.length > 0 ? (
            // ユーザーがアップロードしたファイルのプレビュー
            <div>
              <CloseButton handleReject={handleReject} />
              <Box h={220}>{previews}</Box>
            </div>
          ) : defaultImageUrl ? (
            // デフォルトの imageUrl がある場合はこちらを表示
            <Box>
              <CloseButton handleReject={handleReject} />
              <Image alt='既存画像' h='220px' src={imageUrl} w='auto' />
            </Box>
          ) : (
            <Group gap='xl' justify='center' style={{ pointerEvents: 'none' }}>
              <Dropzone.Accept>
                <MdOutlineUploadFile color='var(--mantine-color-blue-6)' size={52} />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconClose color='var(--mantine-color-red-6)' size={52} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <MdInsertPhoto color='var(--mantine-color-dimmed)' size={52} />
              </Dropzone.Idle>
              <Box>
                <Text inline c='dimmed' size='xl'>
                  画像をドラッグ&ドロップするか、クリックして選択してください
                </Text>
                <Text inline c='dimmed' mt={7} size='sm'>
                  ファイルサイズは5MBを超えることはできません。
                </Text>
              </Box>
            </Group>
          )}
        </Group>
      </Dropzone>
    </>
  );
};

const CloseButton = ({ handleReject }: { handleReject: (e: React.MouseEvent<HTMLElement>) => void }) => {
  return (
    <ActionIcon
      aria-label='画像を削除'
      title='画像を削除'
      variant='subtle'
      styles={{
        root: {
          border: '1px solid var(--mantine-color-dimmed)',
          borderRadius: '50%',
          pointerEvents: 'auto',
          position: 'absolute',
          right: 0,
          top: 0,
        },
      }}
      onClick={(e) => handleReject(e)}
    >
      <IconClose color='var(--mantine-color-dimmed)' size={16} />
    </ActionIcon>
  );
};
