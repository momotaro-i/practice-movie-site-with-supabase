import { ActionIcon, Box, Group, Image, Text } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { useEffect, useState } from 'react';
import { MdInsertPhoto, MdOutlineUploadFile } from 'react-icons/md';

import { IconClose } from '@/components/icons/IconClose';

type Props = {
  defaultImageUrl?: string | null;
  onFileSelected: (file: File | null) => void;
};
export const FileDropzone = ({ defaultImageUrl, onFileSelected, ...props }: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [existingUrl, setExistingUrl] = useState<string | null>(defaultImageUrl ?? null);

  useEffect(() => {
    setExistingUrl(defaultImageUrl ?? null);
  }, [defaultImageUrl]);

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

  const handleDrop = (dropped: File[]) => {
    const f = dropped[0] || null;
    setFiles(dropped);
    setExistingUrl(null); // 新しいファイルを選択したら既存のURLをクリア
    onFileSelected?.(f);
  };

  const handleReject = () => {
    setFiles([]);
    onFileSelected?.(null);
  };

  const handleClear = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (files.length > 0) {
      // 新規ファイルをクリア
      setFiles([]);
      onFileSelected?.(null);
    } else if (existingUrl) {
      // 既存サムネをクリア
      setExistingUrl(null);
      onFileSelected?.(null);
    }
  };
  return (
    <>
      <Dropzone
        accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
        maxFiles={1}
        onDrop={handleDrop}
        onReject={handleReject}
        {...props}
      >
        <Group justify='center' mih={220} pos='relative'>
          {files.length > 0 ? (
            // ユーザーがアップロードしたファイルのプレビュー
            <div>
              <CloseButton onClick={handleClear} />
              <Box h={220}>{previews}</Box>
            </div>
          ) : existingUrl ? (
            // 既存サムネの表示
            <Box pos='relative'>
              <CloseButton onClick={handleClear} />
              <Image alt='既存画像' h={220} src={existingUrl} w='auto' />
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

const CloseButton = ({ onClick }: { onClick: (e: React.MouseEvent<HTMLElement>) => void }) => {
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
      onClick={(e) => onClick(e)}
    >
      <IconClose color='var(--mantine-color-dimmed)' size={16} />
    </ActionIcon>
  );
};
