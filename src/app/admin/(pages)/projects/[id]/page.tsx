import { projectsApi } from "@/lib/api/project";
import EditProjectClient from "./EditProjectClient";

const EditProjectPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const res = await projectsApi.getById(id);
  return <EditProjectClient project={res.data} />;
};

export default EditProjectPage;
