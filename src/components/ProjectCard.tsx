interface props {
  title: string;
  body: string;
  image: string;
  tags: string[];
  status: any;
}

function ProjectCard({ title, body, image, tags, status }: props) {
  return (
    <div className="project-card">
      {status === "0" && (
        <div className="ribbon">
          <span>ONGOING</span>
        </div>
      )}
      <img src={image} alt="Project" />
      <div className="project-body">
        <div className="title-sm">{title}</div>
        <p>{body}</p>
        {tags.map((tag) => (
          <span key={tag} className="project-tag">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ProjectCard;
