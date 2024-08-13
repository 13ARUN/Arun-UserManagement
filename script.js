const sidebar = document.querySelector('.sidebar'),
    logo = document.querySelector('.logo_content');

logo.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});



document.addEventListener("DOMContentLoaded", function () {
    const sidebarLinks = document.querySelectorAll('.nav_list a');
    const contentSections = document.querySelectorAll('.home_content');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            sidebarLinks.forEach(link => link.classList.remove('selected'));
            contentSections.forEach(section => section.style.display = 'none');

            document.querySelector(this.getAttribute('href')).style.display = 'flex';
            this.classList.add('selected');
        });
    });

    contentSections.forEach((section, index) => {
        section.style.display = index === 0 ? 'flex' : 'none';
    });
});

//* user js

const createUserModal = document.querySelector('.addUserModal'),
    createUserBtn = document.querySelector('#addUser'),
    closeBtn = document.querySelector('#closeAddUserModal'),
    submitBtn = document.querySelector('#submitAddUserModal');

const userName = document.querySelector('#userName');
const email = document.querySelector('#email');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');

createUserBtn.addEventListener('click', () => {
    createUserModal.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    createUserModal.style.display = 'none';
});

submitBtn.addEventListener('click', () => {
    const user = {
        id: generateUserId(),
        userName: formatInput(userName.value),
        email: formatInput(email.value),
        firstName: formatInput(firstName.value),
        lastName: formatInput(lastName.value),
    };

    const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify(user));

    userName.value = "";
    email.value = "";
    firstName.value = "";
    lastName.value = "";

    renderUsers();

    createUserModal.style.display = 'none';
});

function formatInput(input) {
    return input.trim().replace(/\s+/g, ' ');
}

function generateUserId() {
    const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    return users.length ? users[users.length - 1].id + 1 : 1;
}

document.addEventListener('DOMContentLoaded', renderUsers);

function renderUsers() {
    const usersTableBody = document.querySelector('#usersTable tbody');
    const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

    usersTableBody.innerHTML = '';

    if (users.length === 0) {
        const noUsersRow = document.createElement('tr');
        noUsersRow.innerHTML = `
            <td colspan="6" class="no-users">No users</td>
        `;
        usersTableBody.appendChild(noUsersRow);
    } else {
        users.forEach(user => {
            const formattedUserId = `U${String(user.id).padStart(3, '0')}`;

            const row = document.createElement('tr');
            row.id = `UserRow-${user.id}`;
            row.innerHTML = `
                <td class="userId-${user.id}">${formattedUserId}</td>
                <td class="userName-${user.id}">${user.userName}</td>
                <td class="userEmail-${user.id}">${user.email}</td>
                <td class="userFname-${user.id}">${user.firstName}</td>
                <td class="userLname-${user.id}">${user.lastName}</td>
                <td class="userActions-${user.id}">
                    <button title="edit" class="editUser">Edit</button>
                    <button title="delete" class="deleteUser">Delete</button>
                </td>
            `;
            usersTableBody.appendChild(row);

            const editButton = row.querySelector('.editUser');
            const deleteButton = row.querySelector('.deleteUser');

            editButton.addEventListener('click', () => editUser(user.id));
            deleteButton.addEventListener('click', () => deleteUser(user.id));
        });
    }
}

function deleteUser(userId) {
    const users = JSON.parse(localStorage.getItem('users'));
    const updatedUsers = users.filter(user => user.id !== userId);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    renderUsers();

}
const updateUserModal = document.querySelector('.updateUserModal');
const updateUserForm = document.querySelector('#updateUserForm');
const updateUsername = document.querySelector('#updateUsername');
const updateEmail = document.querySelector('#updateEmail');
const updateFirstName = document.querySelector('#updateFirstName');
const updateLastName = document.querySelector('#updateLastName');
const cancelEditBtn = document.querySelector('#cancelEdit');

function editUser(userId) {
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.id === userId);

    updateUsername.value = user.userName;
    updateEmail.value = user.email;
    updateFirstName.value = user.firstName;
    updateLastName.value = user.lastName;

    updateUserModal.style.display = 'flex';

    updateUserForm.onsubmit = function (event) {
        event.preventDefault();

        user.userName = formatInput(updateUsername.value);
        user.email = formatInput(updateEmail.value);
        user.firstName = formatInput(updateFirstName.value);
        user.lastName = formatInput(updateLastName.value);

        localStorage.setItem('users', JSON.stringify(users));

        updateUserModal.style.display = 'none';
        updateUserForm.reset();

        renderUsers();

    };
}

cancelEditBtn.addEventListener('click', () => {
    updateUserModal.style.display = 'none';
});





//* group js

// Create Group Modal
const createGroupModal = document.querySelector('.createGroupModal');
const createGroupBtn = document.querySelector('#createGroup');
const closeCreateGroupModalBtn = document.querySelector('#closeCreateGroupModal');
const submitCreateGroupModalBtn = document.querySelector('#submitCreateGroupModal');
const groupNameInput = document.querySelector('#groupName');

function showModal(modal) {
    modal.style.display = 'flex';
}

function hideModal(modal) {
    modal.style.display = 'none';
}

createGroupBtn.addEventListener('click', () => showModal(createGroupModal));
closeCreateGroupModalBtn.addEventListener('click', () => hideModal(createGroupModal));

submitCreateGroupModalBtn.addEventListener('click', () => {
    const group = {
        id: generateGroupId(),
        groupName: groupNameInput.value,
        users: [] // Initialize with an empty users array
    };

    const groups = localStorage.getItem('groups') ? JSON.parse(localStorage.getItem('groups')) : [];
    groups.push(group);
    localStorage.setItem('groups', JSON.stringify(groups));

    groupNameInput.value = "";
    renderGroups();
    hideModal(createGroupModal);
});

function generateGroupId() {
    const groups = localStorage.getItem('groups') ? JSON.parse(localStorage.getItem('groups')) : [];
    return groups.length ? groups[groups.length - 1].id + 1 : 1;
}

// Render Groups
function renderGroups() {
    const groupsTableBody = document.querySelector('#groupsTable tbody');
    const groups = localStorage.getItem('groups') ? JSON.parse(localStorage.getItem('groups')) : [];

    groupsTableBody.innerHTML = '';

    if (groups.length === 0) {
        const noGroupsRow = document.createElement('tr');
        noGroupsRow.innerHTML = '<td colspan="4" class="no-users">No groups</td>';
        groupsTableBody.appendChild(noGroupsRow);
    } else {
        groups.forEach(group => {
            const formattedGroupId = `G${String(group.id).padStart(3, '0')}`;

            const row = document.createElement('tr');
            row.id = `GroupRow-${group.id}`;
            const usersContent = group.users.length ? group.users.join(', ') : 'No users assigned';
            row.innerHTML = `
                <td class="groupId-${group.id}">${formattedGroupId}</td>
                <td class="groupName-${group.id}">${group.groupName}</td>
                <td class="users-${group.id}">${usersContent}</td>
                <td class="userActions-${group.id}">
                    <button title="add" class="addUser">Add User</button>
                    <button title="remove" class="removeUser">Remove User</button>
                </td>
            `;
            groupsTableBody.appendChild(row);

            row.querySelector('.addUser').addEventListener('click', () => addUser(group.id));
            row.querySelector('.removeUser').addEventListener('click', () => removeUser(group.id));
        });
    }
}

document.addEventListener('DOMContentLoaded', renderGroups);

// Add User to Group Modal
const addUserToGroupModal = document.querySelector('.addUserToGroupModal');
const usersSelect = document.querySelector('#usersSelect');
const addUsersToGroupForm = document.querySelector('#addUsersToGroupForm');
const addUserSubmitBtn = document.querySelector('#addUsersToGroupForm button[type="submit"]');
const closeAddUserBtn = document.querySelector('#closeAddUser');

closeAddUserBtn.addEventListener('click', () => hideModal(addUserToGroupModal));

// Add User to Group Modal
function addUser(groupId) {
    showModal(addUserToGroupModal);

    const groups = localStorage.getItem('groups') ? JSON.parse(localStorage.getItem('groups')) : [];
    const group = groups.find(g => g.id === groupId);
    addUserSubmitBtn.innerHTML = `Add users to ${group.groupName}`;

    const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    if (users.length === 0) {
        usersSelect.innerHTML = '<option>No users to add</option>';
        addUserSubmitBtn.disabled = true; // Disable the submit button if no users
    } else {
        usersSelect.innerHTML = users.map(user => `<option value="${user.id}">${user.userName}</option>`).join('');
        addUserSubmitBtn.disabled = false; // Enable the submit button if users are available
    }

    addUsersToGroupForm.onsubmit = (event) => {
        event.preventDefault();

        const selectedUserNames = Array.from(usersSelect.selectedOptions).map(option => option.textContent);
        const updatedGroups = groups.map(g => {
            if (g.id === groupId) {
                if (!g.users) g.users = [];
                selectedUserNames.forEach(userName => {
                    if (!g.users.includes(userName)) g.users.push(userName);
                });
            }
            return g;
        });

        localStorage.setItem('groups', JSON.stringify(updatedGroups));
        renderGroups();
        hideModal(addUserToGroupModal);
    };
}

// Remove User from Group Modal
const removeUserFromGroupModal = document.querySelector('.removeUserFromGroup');
const userSelect = document.querySelector('#usersSelectRemove');
const removeUsersFromGroupForm = document.querySelector('#removeUserFromGroup');
const closeRemoveUserBtn = document.querySelector('#closeRemoveUser');
const removeUserSubmitBtn = document.querySelector('#removeUserFromGroup button[type="submit"]');

closeRemoveUserBtn.addEventListener('click', () => hideModal(removeUserFromGroupModal));

function removeUser(groupId) {
    showModal(removeUserFromGroupModal);

    const groups = localStorage.getItem('groups') ? JSON.parse(localStorage.getItem('groups')) : [];
    const group = groups.find(g => g.id === groupId);

    if (group) {
        removeUserSubmitBtn.innerHTML = `Remove users from ${group.groupName}`;
        
        if (group.users.length === 0) {
            userSelect.innerHTML = '<option>No users to remove</option>';
            removeUserSubmitBtn.disabled = true; // Disable the submit button if no users to remove
        } else {
            userSelect.innerHTML = group.users.map(user => `<option>${user}</option>`).join('');
            removeUserSubmitBtn.disabled = false; // Enable the submit button if users are available
        }

        removeUsersFromGroupForm.onsubmit = (event) => {
            event.preventDefault();

            const selectedUsers = Array.from(userSelect.selectedOptions).map(option => option.textContent);
            const updatedGroups = groups.map(g => {
                if (g.id === groupId) {
                    g.users = g.users.filter(user => !selectedUsers.includes(user));
                }
                return g;
            });

            localStorage.setItem('groups', JSON.stringify(updatedGroups));
            renderGroups();
            hideModal(removeUserFromGroupModal);
        };
    }
}



module.exports = {
    renderUsers,
    deleteUser,
    editUser,
    renderGroups
};





