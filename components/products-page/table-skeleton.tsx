import { TableRow, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductTableRowSkeleton() {
  return (
    <TableRow>
      {/* Product info cell */}
      <TableCell>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 relative">
            <Skeleton className="h-12 w-12 rounded-lg" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
      </TableCell>

      {/* Categories cell */}
      <TableCell>
        <div className="flex items-center justify-center flex-col gap-1">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
      </TableCell>

      {/* Price cell */}
      <TableCell>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
      </TableCell>

      {/* Rating cell */}
      <TableCell>
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-5 w-5 rounded-full" />
          ))}
        </div>
      </TableCell>

      {/* Status badge cell */}
      <TableCell>
        <Skeleton className="h-6 w-16 rounded-full" />
      </TableCell>

      {/* Actions cell */}
      <TableCell className="text-right">
        <Skeleton className="h-8 w-8 rounded-md ml-auto" />
      </TableCell>
    </TableRow>
  );
}
