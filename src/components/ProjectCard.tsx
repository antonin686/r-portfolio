interface props {
  title: string;
  body: string;
  image: string;
  tags: string[];
  status: any;
  timespan: string;
}

function ProjectCard({ title, body, image, tags, status, timespan }: props) {
  return (
    <div className="project-card project-card-height">
      {status === "0" && (
        <div className="ribbon">
          <span>ONGOING</span>
        </div>
      )}
      <img src={image} alt="Project" />
      <div className="project-body">
        <div className="title-sm">{title}</div>
        <small className="text-secondary">{timespan}</small>
        <p>{body}</p>
        <div className="project-tags">
        {tags.map((tag) => (
          <span key={tag} className="project-tag">
            #{tag}
          </span>
        ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
