import { UseFormReturnType } from '@mantine/form';
import { SupabaseClient } from '@supabase/supabase-js';
import { useState } from 'react';
type Props = {
  form: UseFormReturnType<any, (values: any) => any>;
  onClose: () => void;
  supabase: SupabaseClient; // fixme
};
export const useThumbnailUpload = ({ form, onClose, supabase }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUpload = async ({
    itemId,
    subThemeId,
    themeId,
  }: {
    itemId: number;
    subThemeId: number;
    themeId: number;
  }) => {
    if (!selectedFile) return;

    try {
      // 拡張子を取得
      const extension = selectedFile.name.split('.').pop();
      // ファイル名を作成
      const fileName = `thumbnail${themeId}-${subThemeId}-${itemId}.${extension}`;
      const path = `thumbnails/${fileName}`;
      const { data, error } = await supabase.storage
        .from('thumbnails') // バケット名
        .upload(path, selectedFile, {
          contentType: selectedFile.type,
          upsert: false,
        });

      if (error) throw error;
      console.log('uploaded:', data);

      // ✅ 成功後の処理（DB保存や画面更新など）
      onClose();
    } catch (e) {
      console.error(e);
      alert('アップロード失敗');
    }
  };

  const handleSelectedFile = (file: File | null) => {
    setSelectedFile(file);
    form.setFieldValue('file', file);
  };

  return {
    setSelectedFile,
    selectedFile,
    handleUpload,
    handleSelectedFile,
  };
};
