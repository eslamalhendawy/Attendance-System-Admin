import { Table } from "antd";

const StudentsTable = ({ data }) => {
  return (
    <Table className="capitalize" dataSource={data} pagination={false}>
      <Table.Column title="Student ID" dataIndex="index" key="index" />
      <Table.Column title="Name" dataIndex="name" key="name" />
      <Table.Column title="Email" dataIndex="email" key="email" />
      <Table.Column title="Password" dataIndex="password" key="password" />
      <Table.Column title="Level" dataIndex="level" key="level" />
      <Table.Column
        title="Passed Courses"
        dataIndex="passedCourses"
        key="passedCourses"
        render={(_, record) => (
          <div>
            {record.passedCourses.map((course, index) => {
              return <span key={index} className="mr-1">{course},</span>;
            })}
          </div>
        )}
      />
    </Table>
  );
};

export default StudentsTable;
