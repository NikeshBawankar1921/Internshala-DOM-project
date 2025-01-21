document.addEventListener('DOMContentLoaded', function () {
    const studentForm = document.getElementById('student-form');
    const studentData = JSON.parse(localStorage.getItem('students')) || [];
    const studentTable = document.getElementById('student-data');

    // Function to render student data in the table
    function renderTable() {
        studentTable.innerHTML = '';
        studentData.forEach((student, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.studentId}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
            studentTable.appendChild(row);
        });
        localStorage.setItem('students', JSON.stringify(studentData));
    }

    // Form submit handler
    studentForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const studentId = document.getElementById('student-id').value;
        const email = document.getElementById('email').value;
        const contact = document.getElementById('contact').value;

        // Validate student name to ensure it only contains letters
        const namePattern = /^[A-Za-z\s]+$/; // Only letters and spaces allowed
        if (!name || !namePattern.test(name)) {
            alert('Please enter a valid student name (letters and spaces only).');
            return;
        }

        // Validate studentId (numeric)
        if (!studentId || isNaN(studentId)) {
            alert('Student ID must be a valid number.');
            return;
        }

        // Validate email
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!email || !emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Validate contact number (only numbers, should be 10 digits)
        const contactPattern = /^[0-9]{10}$/;
        if (!contact || !contactPattern.test(contact)) {
            alert('Please enter a valid 10-digit contact number.');
            return;
        }

        // Create new student object
        const newStudent = { name, studentId, email, contact };
        studentData.push(newStudent);
        renderTable();
        studentForm.reset();
    });

    // Function to edit a student record
    window.editStudent = function (index) {
        const student = studentData[index];
        document.getElementById('name').value = student.name;
        document.getElementById('student-id').value = student.studentId;
        document.getElementById('email').value = student.email;
        document.getElementById('contact').value = student.contact;

        // Remove the student record and re-render table
        studentData.splice(index, 1);
        renderTable();
    };

    // Function to delete a student record
    window.deleteStudent = function (index) {
        studentData.splice(index, 1);
        renderTable();
    };

    // Initial render
    renderTable();
});

function showdata(page) {
    window.location.href = page;
}
