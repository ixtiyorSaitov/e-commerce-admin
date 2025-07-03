"use client";

import { AdminLayout } from "@/components/admin-layout";
import { UsersPage } from "@/components/users-page";
import UsersPageSkeleton from "@/components/users-page/skeleton";
import { IUser } from "@/interfaces/user.interface";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Users() {
  const [datas, setDatas] = useState<IUser[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data: response } = await axios.get("/api/user/get-all");
        console.log(response);
        if (response.success) {
          setDatas(response.datas);
        }
      } catch (error) {
        toast.error("Error with getting users");
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);
  return (
    <AdminLayout>
      {loading ? (
        <UsersPageSkeleton />
      ) : (
        <>{datas !== null && <UsersPage datas={datas} />}</>
      )}
    </AdminLayout>
  );
}
