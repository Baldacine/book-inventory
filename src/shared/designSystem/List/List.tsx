import type { ListProps } from "./types";
import { ListWrapper, Card, Content, Actions, TotalItems } from "./styles";
import { useRef, useCallback } from "react";
import { Loading } from "../Loading/Loading";

export function List<T>({
  items,
  renderItem,
  actions,
  noItemsMessage,
  hasMore,
  loading,
  loadMore,
  total,
}: ListProps<T> & {
  hasMore?: boolean;
  loading?: boolean;
  loadMore?: () => void;
  total: number;
}) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const loadMoreRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            loadMore?.();
          }
        },
        { root: null, rootMargin: "100px", threshold: 0 },
      );

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore, loadMore],
  );

  if (items.length === 0)
    return <div>{noItemsMessage || "No items available."}</div>;

  return (
    <ListWrapper>
      {items.map((item) => (
        <Card key={item.id}>
          <Content>{renderItem(item.data)}</Content>
          {actions && <Actions>{actions(item.data)}</Actions>}
        </Card>
      ))}

      {hasMore && !loading && <div ref={loadMoreRef} style={{ height: 1 }} />}
      {loading && <div>Loading...</div>}
      {hasMore && !loading && (
        <div ref={loadMoreRef} style={{ height: 1 }}>
          <Loading />
          <TotalItems>
            Showing {items.length} of {total} books
          </TotalItems>
        </div>
      )}
    </ListWrapper>
  );
}
