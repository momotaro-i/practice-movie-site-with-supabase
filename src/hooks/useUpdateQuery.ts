'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

/**
 * クエリ差分更新フック（App Router）
 * - null/undefined/'' はキー削除
 * - 配列はユニーク化してカンマ区切り（任意）
 */
export const useUpdateQuery = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateQuery = (
    newQuery: Record<string, unknown>,
    options?: {
      commaJoinArrays?: boolean; // 配列をカンマ結合するか (default: true)
      keepHash?: boolean; // #以降を維持するか (default: true)
      scroll?: boolean; // 更新時にスクロールするか (default: false)
    }
  ) => {
    const { commaJoinArrays = true, keepHash = true, scroll = false } = options ?? {};

    // 現在のクエリをコピー
    const params = new URLSearchParams(searchParams?.toString());

    // newQuery で上書き
    for (const [key, value] of Object.entries(newQuery)) {
      if (value == null || value === '') {
        // null / undefined / '' → クエリから削除
        params.delete(key);
        continue;
      }

      if (Array.isArray(value)) {
        // 配列の場合はユニーク化
        const uniq = Array.from(new Set(value.map(String)));
        params.delete(key);
        if (commaJoinArrays) {
          // "a,b,c" の形式で保存
          params.set(key, uniq.join(','));
        } else {
          // a=1&a=2... の形式で保存
          uniq.forEach((v) => params.append(key, v));
        }
      } else {
        // それ以外は文字列にして保存
        params.set(key, String(value));
      }
    }

    // 新しい URL を組み立て
    const qs = params.toString();
    const hash = keepHash ? (typeof window !== 'undefined' ? window.location.hash : '') : '';
    const url = qs ? `${pathname}?${qs}${hash}` : `${pathname}${hash}`;

    // router.replace で URL を更新（リロードなし）
    router.replace(url, { scroll });
  };

  return { updateQuery };
};

// 追加・更新
// updateQuery({ edit: 123 });

// 削除
// updateQuery({ edit: null });

// 配列はカンマ結合（デフォルト）
// updateQuery({ tags: ["a", "b", "a"] });

// a=1&a=2... 形式にしたいなら
// updateQuery({ tags: ["1", "2"] }, { commaJoinArrays: false });
