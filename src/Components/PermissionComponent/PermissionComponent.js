import classes from './PermissionComponent.module.css'
import { useEffect, useState } from 'react';

const PermissionComponent = ({permission}) => {
    console.log(permission);
    const [state, changeState] = useState(false)


    useEffect(()=>{
        fetch(`${process.env.REACT_APP_FETCH_LINK}/organizationDetails`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'id': permission.OrId                 
            }
        }).then((response)=>{
            return response.json();
        }).then((response)=>{
            console.log(response);
            changeState(response[0])
        })
    }, [])

    const btnHandler = (e) => {
        console.log('Btn Handler')
        fetch(`${process.env.REACT_APP_FETCH_LINK}/${e.target.id}Permissions`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                '_id': permission._id
            }
        }).then((response)=>{
            return response.json()
        }).then((response)=>{
            console.log(response)
            alert('Action Done')
        })
    }

    return (
        <div className={classes.permissionModel}>

            Permission Requested By {state.OrganizationName}
            Firm contact detail {state.OrganizationRepMail} and {state.OrganizationRepPhoneNumber}
            {permission.Model  && 
                <>
                    {permission.Model == 'Volunteer' && 
                        <>
                        <p>Event Name: - {permission.Permission.EventName}</p>
                        <p>Event Organization: - {permission.Permission.EventOrganization}</p>
                        <p>Event Descripition: - {permission.Permission.EventDescription}</p>
                        <p>Volunteers Needed: - {permission.Permission.VolunteersNeed}</p>
                        <p>Volunteers Present: - {permission.Permission.VolunteersPresent}</p>

                        </> 
                    } 
                    
                    {permission.Model == 'Shelter' && 
                        <>
                        <p>Shelter Name: - {permission.Permission.ShelterName}</p>
                        <p>Shelter Company: - {permission.Permission.ShelterCompany}</p>
                        <p>Shelter Description: - {permission.Permission.ShelterDescription}</p>
                        <p>Resident Capacity: - {permission.Permission.ResidentCapacity}</p>
                        <p>Resident Present Members: - {permission.Permission.ResidentPresentMember}</p>

                        </> 
                    } 
                    
                    {permission.Model == 'Legal' && 
                        <>
                        <p>Legal Org Name: - {permission.Permission.LegalOrgName}</p>
                        <p>Legal Program Descripition: - {permission.Permission.LegalProDescription}</p>
                        <p>Legal Program Name: - {permission.Permission.LegalProName}</p>
                        <p>Legal Organization Description: - {permission.Permission.LegalOrgDescription}</p>
                        <p>Contact Info: - {permission.Permission.VolunteersPresent}</p>

                        </> 
                    } 
                    
                    {permission.Model == 'Health' && 
                        <>
                        <p>Health Program Name: - {permission.Permission.HealthName}</p>
                        <p>Health Program Descripition: - {permission.Permission.HealthProDescription}</p>
                        <p>Health Organization: - {permission.Permission.HealthOrganization}</p>
                        <p>Health Organization Descripition: - {permission.Permission.HealthOrgDescription}</p>
                        <p>Contact Info: - {permission.Permission.Contact}</p>

                        </> 
                    } 
                    
                </>
 
            }
            {permission.Status == 'Accept' && <button className={classes.accepted}>Accepted</button>}
            {permission.Status == 'Decline' && <button className={classes.declined}>Declined</button>}
            
            {permission.Status == 'NO' && 
                <>
                <button onClick={btnHandler} id='accept'>Accept</button>
            <button onClick={btnHandler} id='decline'>Reject</button>

                </>
            }
            
        </div>
    )
}

export default PermissionComponent