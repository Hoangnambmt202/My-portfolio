import { projectsApi } from "@/lib/api/project";
import EditProjectClient from "./EditProjectClient";
import { notFound } from "next/navigation";

const EditProjectPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const res = await projectsApi.getById(id);

  if (!res?.data) {
    notFound();
  }

  return <EditProjectClient project={res.data} />;
};

export default EditProjectPage;
