interface props {
  title: string;
  body: string;
  image: string;
  tags: string[];
}

function ProjectCard({ title, body, image, tags }: props) {
  return (
    <div className="project-card">
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
