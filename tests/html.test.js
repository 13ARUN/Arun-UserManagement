const fs = require('fs');
const path = require('path');

describe('HTML', () => {

    function checkElement(selector, attributes) {
        const element = document.querySelector(selector);
        expect(element).toBeTruthy();
        Object.keys(attributes).forEach(attr => {
            expect(element.getAttribute(attr)).toBe(attributes[attr]);
        });
        return element;
    }

    function checkStyles(selector, expectedStyles) {
        const element = document.querySelector(selector);
        expect(element).toBeTruthy();
        const styles = window.getComputedStyle(element);
        Object.keys(expectedStyles).forEach(style => {
            expect(styles[style]).toBe(expectedStyles[style]);
        });
    }

    function checkContains(containerSelector, childSelectors) {
        const container = document.querySelector(containerSelector);
        expect(container).toBeTruthy();
        childSelectors.forEach(childSelector => {
            const child = document.querySelector(childSelector);
            expect(container.contains(child)).toBe(true);
        });
    }

    function checkTextContent(selector, expectedText) {
        const element = document.querySelector(selector);
        expect(element).toBeTruthy();
        expect(element.textContent).toBe(expectedText);
    }

    function checkInnerHtml(selector, expectedText) {
        const element = document.querySelector(selector);
        expect(element).toBeTruthy();
        expect(element.innerHTML).toBe(expectedText);
    }

    function checkNthChildTextContent(trSelector, expectedTextContents) {
        const tr = document.querySelector(trSelector);
        expect(tr).toBeTruthy();
        
        const children = tr.children;
        //expect(children.length).toBe(expectedTextContents.length);
    
        for (let i = 0; i < expectedTextContents.length; i++) {
            expect(children[i].textContent).toBe(expectedTextContents[i]);
        }
    }

    function checkDisabledState(selector, expectedDisabled) {
        const element = document.querySelector(selector);
        expect(element).toBeTruthy();
        expect(element.disabled).toBe(expectedDisabled);
    }

    function checkElementCount(divSelector, elementTag, expectedCount) {
        const divElement = document.querySelector(divSelector);
        const elements = divElement.querySelectorAll(elementTag);
        expect(elements).toHaveLength(expectedCount);
    }

    beforeEach(() => {
        
        const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
        const cssContent = fs.readFileSync(path.resolve(__dirname, '../css/styles.css'), 'utf8');
        
        document.body.innerHTML = html;
        
        const styleElement = document.createElement('style');
        styleElement.textContent = cssContent;
        document.head.appendChild(styleElement);

        jest.resetModules();

       
    });

    describe('Title and Body', () => {


        it('Head and Body', () => {
            checkElement('head',{});
            checkElement('meta', {charset:"UTF-8"});
            checkElement('meta[name="viewport"]', {content:"width=device-width, initial-scale=1.0"});
            checkTextContent('title',"User Management System");
            checkElement('link[rel="stylesheet"',{href:"css/styles.css"});
            checkContains('body', ['.sidebar','#userPage','#groupPage','#rolePage','script']);
        });

    });

    describe('Side Bar', () => {



        it('Sidebar Contents ', () => {

            checkContains('.sidebar', ['.logo_content','.nav_list']);
            checkContains('.logo_content',['.logo','.logo_content i']);
            checkContains('.logo',['.logo i','.logo_name']);
            checkContains('.logo_name',['h3']);
            checkContains('.nav_list',['li','#user','#group','#role']);
            checkContains('#user',['#user i','#user span[class="links_name"]']);
            checkContains('#group',['#group i','#group span[class="links_name"]']);
            checkContains('#role',['#role i','#role span[class="links_name"]']);


        });

        it('Sidebar', () => {

            checkTextContent('.logo_name h3',"Manage Users");
            checkElement('.logo i',{class:"fa-solid fa-users-gear"});
            checkElement('.logo_content #btn',{class:"fa-solid fa-bars"});
            checkElementCount('.nav_list','li', 3);
            checkElement('#user',{
                href: "#userPage",
                class: 'selected',
            });
            checkElement('#group',{
                href: "#groupPage",
            });
            checkElement('#role',{
                href: "#rolePage",
            });
            
            checkElement('#user i',{class:"fa-solid fa-user"});
            checkElement('#group i',{class:"fa-solid fa-user-group"});
            checkElement('#role i',{class:"fa-solid fa-user-gear"});
            checkTextContent('#user span[class="links_name"]', "User Management");
            checkTextContent('#group span[class="links_name"]', "Group Management");
            checkTextContent('#role span[class="links_name"]', "Role Management");

        });
    
    });

    describe('Users Page', () => {


            it('Elements of Content', () => {

                checkContains('#userPage', ['h1','.addUserModal','.topic','.tableusers','.updateUserModal']);
                checkTextContent('#userPage h1', "User Management");

            });

            it('Add User', () => {

                checkContains('.addUserModal', ['#addUserForm','#addUserForm h3','#addUserForm label','#addUserForm input','#addUserForm button']);

                checkStyles('.addUserModal',{display:'none'});
                checkTextContent('#addUserForm h3', "Add User");
                checkElementCount('#addUserForm','label', 4);
                checkElementCount('#addUserForm','input', 4);
                checkTextContent('label[for="userName"]', "Username:");
                checkElement('#userName',{
                    type: 'text',
                    required: ''
                });
                checkTextContent('label[for="email"]', "Email:");
                checkElement('#email',{
                    type: 'email',
                    required: ''
                });
                checkTextContent('label[for="firstName"]', "First Name:");
                checkElement('#firstName',{
                    type: 'text',
                    required: ''
                });
                checkTextContent('label[for="lastName"]', "Last Name:");
                checkElement('#lastName',{
                    type: 'text',
                    required: ''
                });
                checkElement('#closeAddUserModal',{
                    type: 'button',
                });
                checkElement('#submitAddUserModal',{
                    type: 'submit',
                });
                checkElement('#clear',{
                    type: 'reset',
                });
                checkDisabledState('#addUserForm button', false);            
                checkTextContent('#closeAddUserModal', "Close");
                checkTextContent('#submitAddUserModal', "Add User");
                checkTextContent('#clear', "Clear");

            });

            it('Topic', () => {

                checkContains('.topic',['#userList','.createBtn2']);
                checkTextContent('#userList', "Users List");
                checkContains('.createBtn2',['#addUser','.createBtn2 i']);
                checkElement('.createBtn2 i',{class:'fa-solid fa-user-plus'})
                checkTextContent('.createBtn2 button'," Create User")

            });

            it('User Table', () => {

                checkContains('.tableusers', ['#usersTable']);
                checkContains('#usersTable', ['thead','tr','th','tbody']);
                checkElementCount('#usersTable thead tr','th',6);
                checkNthChildTextContent('#usersTable thead tr', [
                    'User ID',
                    'User Name',
                    'Email',
                    'First Name', 
                    'Last Name',  
                    
                    'Actions'
                ]);
                checkInnerHtml('#usersTable tbody','');

            });

            it('Update User', () => {

                checkContains('.updateUserModal', ['#updateUserForm']);
                checkElement('.updateUserModal',{style: "display:none;",});
                checkContains('#updateUserForm', ['#updateUserForm h3','#updateUserForm label','#updateUserForm input','#updateUserForm button']);
                checkElementCount('#updateUserForm','label',4);
                checkElementCount('#updateUserForm','input',4);
                checkTextContent('#updateUserForm h3', "Update User");
                checkTextContent('label[for="updateUsername"]', "Username:");
                checkElement('#updateUsername',{
                    type: 'text',
                    required: ''
                });
                checkTextContent('label[for="updateEmail"]', "Email:");
                checkElement('#updateEmail',{
                    type: 'email',
                    required: ''
                });
                checkTextContent('label[for="updateFirstName"]', "First Name:");
                checkElement('#updateFirstName',{
                    type: 'text',
                    required: ''
                });
                checkTextContent('label[for="updateLastName"]', "Last Name:");
                checkElement('#updateLastName',{
                    type: 'text',
                    required: ''
                });
                checkElement('#updateUserForm button',{
                    type: 'submit',
                });
                checkDisabledState('#updateUserForm button', false);            
                checkTextContent('#updateUserForm button', "Update User");

            });  
            
    });

    describe('Groups Page', () => {


        it('Create Group', () => {

            // checkContains('#groupPage', ['h1','#createGroupForm','#groupList','#addUsersToGroupForm']);

            checkTextContent('#groupPage h1', "Group Management");

            //checkContains('#createGroupForm', ['h3','label','input','button']);

            checkTextContent('#createGroupForm h3', "Create Group");
            checkTextContent('label[for="groupName"]', "Group Name:");
            
            checkElement('#groupName',{
                type: 'text',
                required: ''
            });
        
            checkDisabledState('#createGroupForm button[type="button"]', false);            
            checkTextContent('#createGroupForm button[type="button"]', "Close");

            checkDisabledState('#createGroupForm button[type="submit"]', false);            
            checkTextContent('#createGroupForm button[type="submit"]', "Create Group");

        });

        it('Group List', () => {

            checkTextContent('#groupList', "Groups List");

            // checkContains('#groupsTable', ['thead','tr','th','tbody']);
            checkNthChildTextContent('#groupsTable thead tr', [
                'Group ID',
                'Group Name', 
                'Users',
                'Actions'
            ]);
            checkInnerHtml('#groupsTable tbody','');

        });

        it('Add Users to Group', () => {

            checkContains('#addUsersToGroupForm', ['#addUsersToGroupForm h3','#addUsersToGroupForm label','#addUsersToGroupForm select','#addUsersToGroupForm button']);


            checkTextContent('#addUsersToGroupForm h3', "Add Users to Group");
            
            checkTextContent('label[for="usersSelect"]', "Select Users:");

            checkElement('#usersSelect',{
                required: '',
                multiple:''
            });
        
    
            checkDisabledState('#addUsersToGroupForm button[type="button"]', false);            
            checkTextContent('#addUsersToGroupForm button[type="button"]', "Close");

            checkDisabledState('#addUsersToGroupForm button[type="submit"]', false);            
            checkTextContent('#addUsersToGroupForm button[type="submit"]', "");

        });

        

    });

    describe('Roles Page', () => {


        it('Create Role', () => {

            checkContains('#rolePage', ['#rolePage h1','.tableroles',,'.assignRoleToUserModal','.assignRoleToGroupModal','.tableroleassignments']);

            checkTextContent('#rolePage h1', "Role Management");
        
            checkContains('#createRoleForm', ['#createRoleForm h3','#createRoleForm label','#createRoleForm input','#createRoleForm button']);

            checkTextContent('#createRoleForm h3', "Create Role");
            checkTextContent('label[for="roleName"]', "Role Name:");
            checkTextContent('label[for="roleDescription"]', "Role Description:");

            checkElement('#roleName',{
                type: 'text',
                required: ''
            });
            // checkElement('#roleDescription',{
            //     type: 'text',
            //     required: ''
            // });
            // checkElement('#createRoleForm button',{
            //     type: 'submit',
            // });
            // checkDisabledState('#createRoleForm button', false);            
            // checkTextContent('#createRoleForm button', "Create Role");

        });

        it('Role List', () => {

            checkTextContent('#roleList', "Roles List");

            // checkContains('#rolesTable', ['thead','tr','th','tbody']);
            // checkNthChildTextContent('#rolesTable thead tr', [
            //     'Role Name', 
            //     'Description'
            // ]);
            checkInnerHtml('#rolesTable tbody','');

        });

        it('Assign Roles to Users', () => {

            checkTextContent('#assignRolesToUserForm h3', "Assign Users");
            checkTextContent('label[for="usersSelect"]', "Select Users:");

            checkElement('#usersSelect',{
                required: '',
                multiple:''
            });
        
            checkElement('#assignRolesToUserForm button',{
                type: 'button',
            });
            checkDisabledState('#assignRolesToUserForm button', false);            
            checkTextContent('#assignRolesToUserForm button', "Close");


        });

        it('Assign Roles to Groups', () => {

            checkTextContent('#assignRolesToGroupForm h3', "Assign Groups");
            checkTextContent('label[for="groupsSelect"]', "Select Groups:");

            checkElement('#groupsSelect',{
                required: '',
                multiple:''
            });
        
            checkElement('#assignRolesToGroupForm button',{
                type: 'button',
            });
            checkDisabledState('#assignRolesToGroupForm button', false);            
            checkTextContent('#assignRolesToGroupForm button', "Close");


        });

        it('Role Assignment List', () => {

            checkTextContent('#roleAssignments', "Role Assignments");

            //checkContains('#roleAssignmentsTable', ['thead','tr','th','tbody']);
            checkNthChildTextContent('#roleAssignmentsTable thead tr', [
                'Role Name', 
                'Assigned Users', 
                'Assigned Groups'
            ]);
            checkInnerHtml('#roleAssignmentsTable tbody','');

        });


    });

    describe('Script file', () => {

        it('Script', () => {
            checkElement('script',{src:"script.js"});
        });

    });

});

