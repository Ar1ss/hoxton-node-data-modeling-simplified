import Database from 'better-sqlite3'

const db = new Database('db/data.db', { verbose: console.log })

const Applicants = [
  {
    id: 1,
    name: 'Aris',
    email: 'aris@mail.com'
  },
  {
    id: 2,
    name: 'Nico',
    email: 'nico@email.com'
  },
  {
    id: 3,
    name: 'Ed',
    email: 'ed@email.com'
  },
  {
    id: 4,
    name: 'Rizky',
    email: 'rizky@email.com'
  },
  {
    id: 5,
    name: 'Luna',
    email: 'luna@email.com'
  }
]
const Interviewers = [
  {
    id: 1,
    name: 'Bob',
    email: 'bob@email.com'
  },
  {
    id: 2,
    name: 'Alice',
    email: 'alice@email.com'
  },
  {
    id: 3,
    name: 'John',
    email: 'john@email.com'
  },
  {
    id: 4,
    name: 'Jane',
    email: 'jane@email.com'
  }
]
const Interview = [
  {
    id: 1,
    applicantId: 1,
    interviewersId: 3
  },
  {
    id: 2,
    applicantId: 1,
    interviewersId: 3
  },
  {
    id: 3,
    applicantId: 1,
    interviewersId: 3
  },
  {
    id: 4,
    applicantId: 1,
    interviewersId: 3
  },
  {
    id: 5,
    applicantId: 1,
    interviewersId: 3
  }
]
const Company = [
  {
    id: 1,
    name: 'Google',
    city: 'Mountain View',
    employeeId: 1,
    interviewId: 4
  },
  {
    id: 2,
    name: 'Amazon',
    city: 'Seattle',
    employeeId: 2,
    interviewId: 3
  },
  {
    id: 3,
    name: 'YouTube',
    city: 'San Bruno',
    employeeId: 1,
    interviewId: 2
  },
  {
    id: 4,
    name: 'Facebook',
    city: 'Menlo Park',
    employeeId: 1,
    interviewId: 1
  },
  {
    id: 5,
    name: 'Microsoft',
    city: 'Redmond',
    employeeId: 4,
    interviewId: 2
  }
]
const Employee = [
  {
    id: 1,
    name: 'Jon',
    email: 'jon@email.com',
    positon: 'Software Engineer'
  },
  {
    id: 2,
    name: 'Ron',
    email: 'ron@email.com',
    positon: 'IT Support'
  },
  {
    id: 3,
    name: 'Olesa',
    email: 'olesa@email.com',
    positon: '3D Designer'
  },
  {
    id: 4,
    name: 'Mumu',
    email: 'mumu@email.com',
    positon: 'Graphic Designer'
  },
  {
    id: 5,
    name: 'Bubu',
    email: 'bubu@email.com',
    positon: 'Software Engineer'
  }
]
const Email = [
  {
    id: 1,
    employeeId: 1,
    companyId: 1,
    applicantId: 1,
    interviewersId: 1
  },
  {
    id: 2,
    employeeId: 2,
    companyId: 3,
    applicantId: 1,
    interviewersId: 2
  },
  {
    id: 3,
    employeeId: 3,
    companyId: 2,
    applicantId: 3,
    interviewersId: 4
  },
  {
    id: 4,
    employeeId: 4,
    companyId: 4,
    applicantId: 2,
    interviewersId: 1
  }
]
const Position = [
  {
    id: 1,
    employeeId: 1,
    companyId: 1
  },
  {
    id: 2,
    employeeId: 2,
    companyId: 2
  },
  {
    id: 3,
    employeeId: 3,
    companyId: 3
  },
  {
    id: 4,
    employeeId: 4,
    companyId: 4
  }
]

db.exec(`
        
DROP TABLE IF EXISTS Applicants;
DROP TABLE IF EXISTS Interviewers;
DROP TABLE IF EXISTS Interview;
DROP TABLE IF EXISTS Company;
DROP TABLE IF EXISTS Employee;
DROP TABLE IF EXISTS Email;
DROP TABLE IF EXISTS Position;

`)

db.exec(`

CREATE TABLE Applicants (
    id integer,
    name text,
    email text,
    PRIMARY KEY (id)
  );
  
  CREATE TABLE Interviewers (
    id Interviewers,
    name text,
    email text,
    PRIMARY KEY (id)
  );
  
  CREATE TABLE Interview (
    ID integer,
    interviewersId integer,
    applicantId integer,
    PRIMARY KEY (id)   
    FOREIGN KEY (interviewersId) REFERENCES Interviewers(id)
    FOREIGN KEY (applicantId) REFERENCES Applicants(id)
  );
  
  CREATE TABLE Company (
    id integer,
    name text,
    city text,
    employeeId integer,
    interviewersId integer,
    PRIMARY KEY (id)

  );
  
  CREATE TABLE Employee (
    id integer,
    name text,
    email text,
    position text,
    PRIMARY KEY (id)
  );
  
  CREATE TABLE Email (
    id integer,
    employeeId integer,
    companyId integer,
    applicantId integer,
    interviewersId integer,
    PRIMARY KEY (id)
    FOREIGN KEY (applicantId) REFERENCES Email (id),
    FOREIGN KEY (interviewersId) REFERENCES Interviewers (id)
  );
  
  CREATE TABLE Position (
    id integer,
    employeeId integer,
    companyId integer,
    PRIMARY KEY (id)
  );
`)

const createApplicants = db.prepare(`
INSERT INTO Applicants (name, email) VALUES ( ?, ?)
`)

for (const applicant of Applicants) {
  createApplicants.run(applicant.name, applicant.email)
}

const createInterviewers = db.prepare(`
INSERT INTO Interviewers (name, email) VALUES ( ?, ?)
`)

for (const interviewer of Interviewers) {
  createInterviewers.run(interviewer.name, interviewer.email)
}

const createInterview = db.prepare(`
INSERT INTO Interview (interviewersId, applicantId) VALUES ( ?, ?)
`)

for (const interview of Interview) {
    createInterview.run(interview.interviewersId, interview.applicantId)
}

const createCompany = db.prepare(`
INSERT INTO Company (name, city, employeeId, interviewersId) VALUES ( ?, ?, ?, ?)
`)

for (const company of Company) {
  createCompany.run(
    company.name,
    company.city,
    company.employeeId,
    company.interviewId
  )
}

const createEmployee = db.prepare(`
INSERT INTO Employee (name, email, position) VALUES ( ?, ?, ?)
`)

for (const employee of Employee) {
  createEmployee.run(employee.name, employee.email, employee.positon)
}

const createEmail = db.prepare(`
INSERT INTO Email (employeeId, companyId, applicantsId, interviewersId) VALUES ( ?, ?, ?, ?)
`)

for (const email of Email) {
  createEmail.run(
    email.employeeId,
    email.companyId,
    email.applicantId,
    email.interviewersId
  )
}

const createPosition = db.prepare(`
INSERT INTO Position (employeeId, companyId) VALUES ( ?, ?)
`)

for (const position of Position) {
  createPosition.run(position.employeeId, position.companyId)
}
