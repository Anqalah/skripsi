import { Fragment } from "react";
import { FormAddUser } from "../components/Fragments/FormAddUser.jsx";
import AdminLayout from "../components/Layouts/AdminLayout";

export const AddUser = () => {
  return (
    <Fragment>
      <AdminLayout>
        <FormAddUser />
      </AdminLayout>
    </Fragment>
  );
};
