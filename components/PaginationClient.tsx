"use client";

import { Pagination } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  current: number;
  pageSize: number;
  total: number;
};

export default function PaginationClient({ current, pageSize, total }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const onChange = (page: number) => {
    const params = new URLSearchParams(sp.toString());
    if (page > 1) params.set("page", String(page));
    else params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination
      align="center"
      current={current}
      pageSize={pageSize}
      total={total}
      onChange={onChange}
      showSizeChanger={false}
    />
  );
}
