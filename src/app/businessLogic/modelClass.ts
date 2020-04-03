export class Employee
{public firstname:string;
    public middlename:string;
    public lastname:string;
    public email:string;
    public phone:string;
    public rolename:string;
    public address:string;
    public empid:string;
    public customername:string;
    constructor(
    firstname:string,
    middlename:string,
    lastname:string,
    email:string,
    phone:string,
    rolename:string,
    address:string,
    customername:string)
    {   
        this.firstname = firstname;
        this.middlename = middlename;
        this.lastname  = lastname;
        this.email = email;
        this.phone = phone;
        this.rolename = rolename;
        this.address = address;
        this.customername = customername;
    }

}