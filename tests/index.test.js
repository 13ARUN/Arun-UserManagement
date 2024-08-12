const fs = require('fs');
const path = require('path');
const Chance = require('chance');
const chance = new Chance();

const { fireEvent } = require("@testing-library/dom");



function generateRandomString(options) {
    return chance.string(options);
}

const setLocalStorageItem = (key, value) => {
    localStorage.setItem(key, value);
};

const getLocalStorageItem = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

const removeLocalStorageItem = (key) => {
    localStorage.removeItem(key);
}

const clearLocalStorage = () => {
    localStorage.clear();
};


describe('Dynamic sidebar', () => {

    // let sidebar,logo

    // beforeEach(() => {

    //     const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    //     document.body.innerHTML = html;
    //     require('../script.js');

    //     jest.resetModules();

    //     sidebar = document.querySelector('.sidebar');
    //     logo = document.querySelector('.logo_content');

    // });
    
    // it('should toggle class of Sidebar', () => {

    //     expect(sidebar.classList).toContain('sidebar');
    //     expect(sidebar.classList).not.toContain('selected');

    //     logo.click();

    //     expect(sidebar.classList).toContain('sidebar');
    //     expect(sidebar.classList).toContain('active');

    //     logo.click();

    //     expect(sidebar.classList).toContain('sidebar');
    //     expect(sidebar.classList).not.toContain('selected');

    // });

});

describe('User Page', () => {

    beforeEach(() => {

        const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
        document.body.innerHTML = html;

        // ({} = require('./script.js'));
        require('../script.js');

    
        const mockLocalStorage = (() => {
            let store = {};
            return {
                getItem: (key) => store[key] || null,
                setItem: (key, value) => (store[key] = value.toString()),
                clear: () => (store = {}),
                removeItem: (key) => delete store[key],
            };
        })();
        Object.defineProperty(window, 'localStorage', {value: mockLocalStorage,});

        clearLocalStorage();
        jest.resetModules();
    });
        
    afterEach(() => {
        clearLocalStorage();
    });

    describe('Adding users', () => {

        it('should display add User form when create user is clicked', () => {

            const createUserModal = document.querySelector('.addUserModal');
            expect(createUserModal).toBeTruthy();
            expect(createUserModal.style.display).toBe('none');

            const createUserBtn = document.querySelector('#addUser');
            expect(createUserBtn).toBeTruthy();

            createUserBtn.click();

            expect(createUserModal.style.display).toBe('flex');

        });

        it('should close form when close is clicked', () => {

            const createUserModal = document.querySelector('.addUserModal');
            expect(createUserModal).toBeTruthy();
            expect(createUserModal.style.display).toBe('none');

            const createUserBtn = document.querySelector('#addUser');
            expect(createUserBtn).toBeTruthy();

            createUserBtn.click();

            const closeBtn = document.querySelector('#closeAddUserModal');
            expect(closeBtn).toBeTruthy();

            closeBtn.click();

            expect(createUserModal.style.display).toBe('none');

        });

        it('should clear form entries when clear is clicked', () => {

            const userName = document.querySelector('#userName');
            const email = document.querySelector('#email');
            const firstName = document.querySelector('#firstName');
            const lastName = document.querySelector('#lastName');

            expect(userName.value).toBe('');
            expect(email.value).toBe('');
            expect(firstName.value).toBe('');
            expect(lastName.value).toBe('');

            userName.value = "Arun";
            email.value = "Arun";
            firstName.value = "Arun";
            lastName.value = "Arun";

            expect(userName.value).toBe('Arun');
            expect(email.value).toBe('Arun');
            expect(firstName.value).toBe('Arun');
            expect(lastName.value).toBe('Arun');

            const clearBtn = document.querySelector('#clear');
            clearBtn.click();

            expect(userName.value).toBe('');
            expect(email.value).toBe('');
            expect(firstName.value).toBe('');
            expect(lastName.value).toBe('');

    
        });

        it('should add a user to local storage when submitted', () => {

            const userName = document.querySelector('#userName');
            const email = document.querySelector('#email');
            const firstName = document.querySelector('#firstName');
            const lastName = document.querySelector('#lastName');

            expect(userName.value).toBe('');
            expect(email.value).toBe('');
            expect(firstName.value).toBe('');
            expect(lastName.value).toBe('');

            userName.value = "Arun";
            email.value = "Arun";
            firstName.value = "Arun";
            lastName.value = "Arun";

            const submitBtn = document.querySelector('#submitAddUserModal');
            submitBtn.click();

            expect(userName.value).toBe('');
            expect(email.value).toBe('');
            expect(firstName.value).toBe('');
            expect(lastName.value).toBe('');

            let user = getLocalStorageItem('user');
            expect(user.userName).toBe('Arun');
            expect(user.email).toBe('Arun');
            expect(user.firstName).toBe('Arun');
            expect(user.lastName).toBe('Arun');

            let users = getLocalStorageItem('users');
            expect(users[0].userName).toBe('Arun');
            expect(users[0].email).toBe('Arun');
            expect(users[0].firstName).toBe('Arun');
            expect(users[0].lastName).toBe('Arun');


        });

        it('should add subsequent users to local storage when submitted', () => {

            const userName = document.querySelector('#userName');
            const email = document.querySelector('#email');
            const firstName = document.querySelector('#firstName');
            const lastName = document.querySelector('#lastName');

            expect(userName.value).toBe('');
            expect(email.value).toBe('');
            expect(firstName.value).toBe('');
            expect(lastName.value).toBe('');

            userName.value = "Arun";
            email.value = "Arun";
            firstName.value = "Arun";
            lastName.value = "Arun";

            const submitBtn = document.querySelector('#submitAddUserModal');
            fireEvent.click(submitBtn);

            expect(userName.value).toBe('');
            expect(email.value).toBe('');
            expect(firstName.value).toBe('');
            expect(lastName.value).toBe('');

            let user = getLocalStorageItem('user');
            expect(user.userName).toBe('Arun');
            expect(user.email).toBe('Arun');
            expect(user.firstName).toBe('Arun');
            expect(user.lastName).toBe('Arun');

            let users = getLocalStorageItem('users');
            expect(users[0].userName).toBe('Arun');
            expect(users[0].email).toBe('Arun');
            expect(users[0].firstName).toBe('Arun');
            expect(users[0].lastName).toBe('Arun');

            userName.value = "user2";
            email.value = "user2";
            firstName.value = "user2";
            lastName.value = "user2";

            
            fireEvent.click(submitBtn);

            let userUpdated = getLocalStorageItem('user');
            expect(userUpdated.userName).toBe('user2');
            expect(userUpdated.email).toBe('user2');
            expect(userUpdated.firstName).toBe('user2');
            expect(userUpdated.lastName).toBe('user2');

            let usersUpdated = getLocalStorageItem('users');

            expect(usersUpdated[0].userName).toBe('Arun');
            expect(usersUpdated[0].email).toBe('Arun');
            expect(usersUpdated[0].firstName).toBe('Arun');
            expect(usersUpdated[0].lastName).toBe('Arun');

            expect(usersUpdated[1].userName).toBe('user2');
            expect(usersUpdated[1].email).toBe('user2');
            expect(usersUpdated[1].firstName).toBe('user2');
            expect(usersUpdated[1].lastName).toBe('user2');

        });

        it('should format the input values by removing empty spaces', () => {

            const userName = document.querySelector('#userName');
            const email = document.querySelector('#email');
            const firstName = document.querySelector('#firstName');
            const lastName = document.querySelector('#lastName');

            userName.value = "   Arun   ";
            email.value = "Ar  un";
            firstName.value = "    Arun";
            lastName.value = "Arun    ";

            const submitBtn = document.querySelector('#submitAddUserModal');
            fireEvent.click(submitBtn);


            let user = getLocalStorageItem('user');
            expect(user.userName).toBe('Arun');
            expect(user.email).toBe('Ar un');
            expect(user.firstName).toBe('Arun');
            expect(user.lastName).toBe('Arun');

            let users = getLocalStorageItem('users');
            expect(users[0].userName).toBe('Arun');
            expect(users[0].email).toBe('Ar un');
            expect(users[0].firstName).toBe('Arun');
            expect(users[0].lastName).toBe('Arun');
            
    
        });

        it('should generate id for each user based on the users length', () => {
            const userName = document.querySelector('#userName');
            const email = document.querySelector('#email');
            const firstName = document.querySelector('#firstName');
            const lastName = document.querySelector('#lastName');


            userName.value = "Arun";
            email.value = "Arun";
            firstName.value = "Arun";
            lastName.value = "Arun";

            const submitBtn = document.querySelector('#submitAddUserModal');
            fireEvent.click(submitBtn);

            let user1 = getLocalStorageItem('user');
            expect(user1.id).toBe(1);

            let users = getLocalStorageItem('users');
            expect(users[0].id).toBe(1);

            userName.value = "Arun";
            email.value = "Arun";
            firstName.value = "Arun";
            lastName.value = "Arun";

            fireEvent.click(submitBtn);

            let user2 = getLocalStorageItem('user');
            expect(user2.id).toBe(2);

            let usersUpdated = getLocalStorageItem('users');
            expect(usersUpdated[0].id).toBe(1);
            expect(usersUpdated[1].id).toBe(2);
   
        });


        

        

    });

    describe('Viewing users', () => {

        beforeEach(() => {
            ({renderUsers} = require('../script.js'));
        });


        it('should render "No users" when no key exists', () => {

            removeLocalStorageItem('users');
        
            renderUsers();
        
            const usersTableBody = document.querySelector('#usersTable tbody');
            expect(usersTableBody.rows.length).toBe(1);
            expect(usersTableBody.rows[0].textContent.trim()).toBe('No users');
        });

        it('should render "No users" when there are no users', () => {

            setLocalStorageItem('users', JSON.stringify([]));
        
            renderUsers();
        
            const usersTableBody = document.querySelector('#usersTable tbody');
            expect(usersTableBody.rows.length).toBe(1);
            expect(usersTableBody.rows[0].textContent.trim()).toBe('No users');
        });
        

        it('should display the users in the table by rendering users from local storage', () => {

            const Users = [
                { id: 1, userName: 'User1', email: 'user1@example.com', firstName: 'John', lastName: 'Doe' },
                { id: 2, userName: 'User2', email: 'user2@example.com', firstName: 'Jane', lastName: 'Doe' }
            ];
            setLocalStorageItem('users', JSON.stringify(Users));

            renderUsers();

            const usersTableBody = document.querySelector('#usersTable tbody');
            expect(usersTableBody.rows.length).toBe(2);

            const user = document.querySelector('#UserRow-1');
            expect(user).toBeTruthy();

            expect((document.querySelector('.userId-1')).textContent).toBe('U001');
            expect((document.querySelector('.userName-1')).textContent).toBe('User1');
            expect((document.querySelector('.userEmail-1')).textContent).toBe('user1@example.com');
            expect((document.querySelector('.userFname-1')).textContent).toBe('John');
            expect((document.querySelector('.userLname-1')).textContent).toBe('Doe');

            expect((document.querySelector('.userId-2')).textContent).toBe('U002');
            expect((document.querySelector('.userName-2')).textContent).toBe('User2');
            expect((document.querySelector('.userEmail-2')).textContent).toBe('user2@example.com');
            expect((document.querySelector('.userFname-2')).textContent).toBe('Jane');
            expect((document.querySelector('.userLname-2')).textContent).toBe('Doe');
            

        });

        test('should format user ID as U001, U002, etc.', () => {
            const mockUsers = [
                { id: 1, userName: 'User1', email: 'user1@example.com', firstName: 'First1', lastName: 'Last1' },
                { id: 10, userName: 'User2', email: 'user2@example.com', firstName: 'First2', lastName: 'Last2' }
            ];
            setLocalStorageItem('users', JSON.stringify(mockUsers));
        
            renderUsers();
        
            const usersTableBody = document.querySelector('#usersTable tbody');
            expect(usersTableBody.querySelector('.userId-1').textContent).toBe('U001');
            expect(usersTableBody.querySelector('.userId-10').textContent).toBe('U010');
        });
        


        

    });

    describe('Deleting users', () => {

        let users;
    
        beforeEach(() => {
            // Setup initial state for each test

            ({deleteUser} = require('../script.js'));
            users = [
                { id: 1, userName: 'JohnDoe', email: 'john@example.com', firstName: 'John', lastName: 'Doe' },
                { id: 2, userName: 'JaneDoe', email: 'jane@example.com', firstName: 'Jane', lastName: 'Doe' }
            ];
            setLocalStorageItem('users', JSON.stringify(users));

            renderUsers();
        });

    
        it('should delete a user from the list', () => {

            deleteUser(1);
    
            const updatedUsers = getLocalStorageItem('users');
            expect(updatedUsers).toHaveLength(1);
            expect(updatedUsers[0].id).toBe(2);
    
            const userRow = document.querySelector('#UserRow-1');
            expect(userRow).toBeNull();
        });
    

    
        it('should update the user list UI after deletion', () => {

            deleteUser(2);
    
            const updatedUsers = getLocalStorageItem('users');
            expect(updatedUsers).toHaveLength(1);
    

            const deletedUserRow = document.querySelector('#UserRow-2');
            expect(deletedUserRow).toBeNull();
        });
    
        it('should display "No users" message when the last user is deleted', () => {
            deleteUser(1);
            deleteUser(2); 
    
            const updatedUsers = getLocalStorageItem('users');
            expect(updatedUsers).toHaveLength(0);
    
            const noUsersMessage = document.querySelector('.no-users');
            expect(noUsersMessage).not.toBeNull();
            expect(noUsersMessage.textContent).toBe('No users');
        });
    });

    describe('Editing users', () => {
        let users;
    
        beforeEach(() => {
            ({editUser} = require('../script.js'));
    
            users = [
                { id: 1, userName: 'JohnDoe', email: 'john@example.com', firstName: 'John', lastName: 'Doe' },
                { id: 2, userName: 'JaneDoe', email: 'jane@example.com', firstName: 'Jane', lastName: 'Doe' }
            ];
            setLocalStorageItem('users', JSON.stringify(users));
            renderUsers();
        });

        it('should display update User form when edit user is clicked', () => {

            const updateUserModal = document.querySelector('.updateUserModal');
            expect(updateUserModal).toBeTruthy();
            expect(updateUserModal.style.display).toBe('none');

            editUser(1);

            expect(updateUserModal.style.display).toBe('flex');

        });
    
        it('should pre-fill the edit form with the correct user data', () => {
            editUser(1);
    
            expect(document.querySelector('#updateUsername').value).toBe('JohnDoe');
            expect(document.querySelector('#updateEmail').value).toBe('john@example.com');
            expect(document.querySelector('#updateFirstName').value).toBe('John');
            expect(document.querySelector('#updateLastName').value).toBe('Doe');
        });
    
        it('should update the user data in localStorage and UI after editing', () => {
            editUser(1);
    
            document.querySelector('#updateUsername').value = 'JohnUpdated';
            document.querySelector('#updateEmail').value = 'johnupdated@example.com';
            document.querySelector('#updateFirstName').value = 'Johnny';
            document.querySelector('#updateLastName').value = 'DoeUpdated';
    
            document.querySelector('#updateUserForm').dispatchEvent(new Event('submit'));
    
            const updatedUsers = getLocalStorageItem('users');
            expect(updatedUsers[0].userName).toBe('JohnUpdated');
            expect(updatedUsers[0].email).toBe('johnupdated@example.com');
            expect(updatedUsers[0].firstName).toBe('Johnny');
            expect(updatedUsers[0].lastName).toBe('DoeUpdated');
    
            const updatedUserRow = document.querySelector('.userName-1');
            expect(updatedUserRow.textContent).toBe('JohnUpdated');
        });
    
        it('should close the edit modal without saving changes when cancel is clicked', () => {
            editUser(1);
    
            document.querySelector('#updateUsername').value = 'JohnUpdated';
            document.querySelector('#updateEmail').value = 'johnupdated@example.com';
            document.querySelector('#updateFirstName').value = 'Johnny';
            document.querySelector('#updateLastName').value = 'DoeUpdated';
    
            const cancelBtn = document.querySelector('#cancelEdit');
            cancelBtn.click();
    
            const editModal = document.querySelector('.updateUserModal');
            expect(editModal.style.display).toBe('none');
    
            const users = getLocalStorageItem('users');
            expect(users[0].userName).toBe('JohnDoe');
        });
    });
    
    
    

});

describe('Group Page', () => {

    beforeEach(() => {

        const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
        document.body.innerHTML = html;


        require('../script.js');

    
        const mockLocalStorage = (() => {
            let store = {};
            return {
                getItem: (key) => store[key] || null,
                setItem: (key, value) => (store[key] = value.toString()),
                clear: () => (store = {}),
                removeItem: (key) => delete store[key],
            };
        })();
        Object.defineProperty(window, 'localStorage', {value: mockLocalStorage,});

        clearLocalStorage();
        jest.resetModules();
    });
        
    afterEach(() => {
        clearLocalStorage();
    });

    describe('Adding Groups', () => {

        it('should display add Group form when create group is clicked', () => {

            const createGroupModal = document.querySelector('.createGroupModal');
            expect(createGroupModal).toBeTruthy();
            expect(createGroupModal.style.display).toBe('none');

            const createGroupBtn = document.querySelector('#createGroup');
            expect(createGroupBtn).toBeTruthy();

            expect(createGroupModal.style.display).toBe('none');

            createGroupBtn.click();

            //expect(createGroupModal.style.display).toBe('');

        });

        it('should close form when close is clicked', () => {

            const createGroupModal = document.querySelector('.createGroupModal');
            expect(createGroupModal).toBeTruthy();
            expect(createGroupModal.style.display).toBe('none');

            const createGroupBtn = document.querySelector('#createGroup');
            expect(createGroupBtn).toBeTruthy();

            createGroupBtn.click();

            expect(createGroupModal.style.display).toBe('flex');

            const closeBtn = document.querySelector('#closeCreateGroupModal');
            expect(closeBtn).toBeTruthy();

            closeBtn.click();

            expect(createGroupModal.style.display).toBe('none');

        });

        it('should add a user to local storage when submitted', () => {

            const groupName = document.querySelector('#groupName');

            expect(groupName.value).toBe('');

            groupName.value = "Group 1";

            const submitBtn = document.querySelector('#submitCreateGroupModal');
            submitBtn.click()

            expect(groupName.value).toBe('');


            let groups = getLocalStorageItem('groups');
            expect(groups[0].groupName).toBe('Group 1');



        });

        it('should add subsequent Groups to local storage when submitted', () => {

            const groupName = document.querySelector('#groupName');

            expect(groupName.value).toBe('');

            groupName.value = "Group 1";

            const submitBtn = document.querySelector('#submitCreateGroupModal');
            submitBtn.click()

            expect(groupName.value).toBe('');


            let groups = getLocalStorageItem('groups');
            expect(groups[0].groupName).toBe('Group 1');

            groupName.value = "Group 2";
            submitBtn.click();

            expect(groupName.value).toBe('');

            let groupsUpdated = getLocalStorageItem('groups');

            expect(groupsUpdated[0].groupName).toBe('Group 1');
            expect(groupsUpdated[1].groupName).toBe('Group 2');



        });



    });

    describe('Viewing Groups', () => {

    });

});