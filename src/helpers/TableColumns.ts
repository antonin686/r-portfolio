const Cprojects = [
  {
    Header: "#",
    accessor: "id",
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

export { Cprojects };
