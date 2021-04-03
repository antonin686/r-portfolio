const ProjectCol = [
  {
    Header: "id",
    accessor: "id",
  },
  {
    Header: "#",
    Cell: ({row}: any) => {
      return row.original.id;
    },
  },
  {
    Header: "Title",
    accessor: "header_title",
  },
  {
    Header: "Tags",
    accessor: "tags",
    Cell: ({ value }: any) => {
      return value.join(" | ");
    },
  },
  {
    Header: "Added",
    accessor: "created_at",
    Cell: ({ value }: any) => {
      return value.split(" ")[0].split("-").reverse().join("/");
    },
  },
];

export default ProjectCol;
