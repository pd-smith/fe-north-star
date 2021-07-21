import React, { useEffect, useState } from "react";
import CarrotClient from "../../../lib/carrot-api";
import { HttpErrors } from "../../../utils/HttpErrors";
import styled from "styled-components";
import { useRouter } from "next/router";
import getConfig from "next/config";
const {
  publicRuntimeConfig: { CARROT_BACKEND_URL, CARROT_BACKEND_ADMIN_URL },
} = getConfig();

const client = new CarrotClient(CARROT_BACKEND_URL);
const ADMIN_HOME = CARROT_BACKEND_ADMIN_URL;

const InfoBox = styled.div`
  margin: 24px 0;
  h3 {
    font-weight: bold;
  }
`;

const TextInput = styled.input`
  padding: 2px;
  border: 2px solid #e0e0e0;
`;

const Button = styled.button`
  margin: 10px;
  padding: 5px;
  border: 2px solid gray;
  background-color: #e0e0e0;
`;

const DraftText = styled.h1`
  font-weight: bold;
  font-size: 35px;
  color: red;
`;

export default function Plans(): JSX.Element {
  const router = useRouter();
  const { employeeId } = router.query;
  const [employee, setEmployee] = useState<any>(null);
  const [company, setCompany] = useState<any>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const gotoSignIn = (): void => {
    window.location.href = "http://localhost:3000/Login";
  };
  const gotoEdit = (): void => {
    window.location.href = `${ADMIN_HOME}/Employees/Edit/Employee/${employee.employeeId}`;
  };

  const fetchEmployee = async (id): Promise<any> => {
    try {
      const response = await client.getEmployee(id);
      return response;
    } catch (error) {
      if (error.name === HttpErrors.UNAUTHORIZED) {
        gotoSignIn();
        return;
      }
      return;
    }
  };

  const updateEmployee = async ({
    employeeId,
    firstName,
    lastName,
  }): Promise<void> => {
    try {
      await client.updateEmployee({
        employeeId,
        firstName,
        lastName,
      });
      return;
    } catch (error) {
      if (error.name === HttpErrors.UNAUTHORIZED) {
        gotoSignIn();
        return;
      }
      return;
    }
  };

  const fetchCompany = async (id): Promise<any> => {
    try {
      const response = await client.getCompany(id);
      return response;
    } catch (error) {
      if (error.name === HttpErrors.UNAUTHORIZED) {
        gotoSignIn();
        return;
      }
      return;
    }
  };

  useEffect(() => {
    const getEmployee = async (): Promise<void> => {
      const employee = await fetchEmployee(employeeId);
      const company = await fetchCompany(employee.companyId);
      setCompany(company);
      setEmployee(employee);
      setFirstName(employee.firstName);
      setLastName(employee.lastName);
    };
    if (!employee && employeeId) {
      getEmployee();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeId]);

  const saveChanges = async (): Promise<void> => {
    await updateEmployee({
      employeeId: employee.employeeId,
      firstName,
      lastName,
    });
    gotoEdit();
  };
  return (
    <div>
      <DraftText>
        THIS IS A DRAFT PAGE, PLEASE DO NOT TAKE ANY ACTIONS IN HERE
      </DraftText>
      {employee ? (
        <div>
          <Button onClick={gotoEdit}>Back to edit</Button>
          <div>{company.name}</div>
          <div>
            first name:{" "}
            <TextInput
              type="text"
              value={firstName}
              onChange={({ target: { value } }) => setFirstName(value)}
            />
            last name:{" "}
            <TextInput
              type="text"
              value={lastName}
              onChange={({ target: { value } }) => setLastName(value)}
            />
          </div>
          <Button onClick={saveChanges}>Update name</Button>
          <InfoBox>
            <h3>Geo Level Information</h3>
            <ul>
              <li>Country: {company.countryCode}</li>
              <li>Employer: {company.name}</li>
            </ul>
          </InfoBox>
          <InfoBox>
            <h3>Child-company-specific setting</h3>
            <ul>
              <li>
                Registration Emails: {company.registrationEmails ? "YES" : "NO"}
              </li>
              <li>Carrot Core: {company.carrotCore ? "YES" : "NO"}</li>
            </ul>
          </InfoBox>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}
