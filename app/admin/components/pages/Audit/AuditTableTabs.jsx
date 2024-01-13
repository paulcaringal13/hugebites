"use client";
import { useEffect, useState } from "react";
import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import AuditTable from "./AuditTable";
// NOT COMPLETED

const AuditTableTabs = () => {
  const [employeeArray, setEmployeeArray] = useState([]);

  // GET ALL DATA TO AUDIT TABLE
  const getAllAudit = async () => {
    const auditRes = await fetch(`http://localhost:3000/api/admin/audit`);
    const data = await auditRes.json();

    const x = data.map((audit) => {
      return {
        employeeId: `${audit.employeeId}`,
        name: `${audit.firstName} ${audit.lastName}`,
        userRole: `${audit.userRole}`,
        timeIn: `${audit.timeIn}`,
        timeOut: `${audit.timeOut}`,
      };
    });

    const employeeArr = x.filter((user) => user.userRole != "Super Admin");

    setEmployeeArray(employeeArr);
  };

  useEffect(() => {
    getAllAudit();
  }, []);

  return (
    <Card className="w-full h-full mx-10 my-5 bg-white">
      <CardHeader>
        <CardTitle className="text-2xl my-2 ms-2 ">Audit Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <AuditTable data={employeeArray} />
      </CardContent>
    </Card>
  );
};
export default AuditTableTabs;
