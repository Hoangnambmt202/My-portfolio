import ProjectRowSkeleton from "./ProjectRowSkeleton";

export default function ProjectTableSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <ProjectRowSkeleton key={i} />
      ))}
    </>
  );
}
