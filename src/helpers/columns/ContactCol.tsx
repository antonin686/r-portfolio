const ContactCol = [
    {
      Header: "id",
      accessor: "id",
    },
    {
      Header: "#",
      Cell: ({row}: any) => {
        return <div id={row.original.id}>{row.original.id}</div>;
      },
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
        Header: "Subject",
        accessor: "subject",
      },
    {
      Header: "Added",
      accessor: "created_at",
      Cell: ({ value }: any) => {
        return value.split(" ")[0].split("-").reverse().join("/");
      },
    },
  ];
  
  export default ContactCol;
  