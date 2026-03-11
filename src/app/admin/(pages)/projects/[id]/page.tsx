import { projectsApi } from "@/lib/api/project";
import EditProjectClient from "./EditProjectClient";

const EditProjectPage = async ({ params }: { params: { id: string } }) => {
  const res = await projectsApi.getById(params.id);
  return <EditProjectClient project={res.data} />;
};

export default EditProjectPage;
