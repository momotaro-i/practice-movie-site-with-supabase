import { UseFormReturnType } from '@mantine/form';
import { useId } from '@mantine/hooks';
import { SupabaseClient } from '@supabase/supabase-js';
import { useState } from 'react';

type Props = {
  form: UseFormReturnType<any, (values: any) => any>;
  supabase: SupabaseClient; // fixme
};
export const useThumbnailUpload = ({ form, supabase }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const uuid = useId();

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      // 拡張子を取得
      const extension = selectedFile.name.split('.').pop();
      // ファイル名を作成
      const fileName = `thumbnail-${uuid}.${extension}`;
      const path = `thumbnails/${fileName}`;
      const { error } = await supabase.storage
        .from('thumbnails') // バケット名
        .upload(path, selectedFile, {
          contentType: selectedFile.type,
          upsert: true, // 既存ファイルを上書き
        });

      if (error) throw error;

      // ✅ 成功後の処理 パスを返す
      return path;
    } catch (e) {
      console.error(e);
      alert('アップロード失敗');
      return null;
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
