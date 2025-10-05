// 환자 검색 기능
function searchPatients() {
    const token = localStorage.getItem('token');
    const searchInput = document.getElementById('patient-search').value;
    fetch('/doctor/searchMyPatients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`            
        },
        body: JSON.stringify({ searchInput }) 
    })
    .then(response => response.json())
    .then(data => {
        const patientTable = document.getElementById('patientSearchResults');
        patientTable.innerHTML = ''; // 기존 내용을 초기화

        data.forEach(patient => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${patient.user.email}</td>
                <td>${patient.user.name}</td>
                <td><button type="button" class="doctor_main-button" onclick="viewPatient('${patient.userId}')">열람</button></td>
            `;
            patientTable.appendChild(row);
        });
    });
}

// 요청 취소 기능
function cancelRequest(doctorId, userId) {
    
    fetch('/doctor/cancelRequest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ doctorId, userId })
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            // 요청 취소 후 UI에서 해당 요청 제거하기
            const requestTable = document.getElementById('requestListResults');
            requestTable.querySelector(`tr[data-user-id="${userId}"]`).remove();
        } else {
            alert(result.message);
        }
    });
}


// 요청 보낸 목록 불러오기
function loadRequestList(data) {
        const requestTable = document.getElementById('requestListResults');
        requestTable.innerHTML = ''; // 기존 내용 초기화

        data.forEach(request => {
            const row = document.createElement('tr');
            row.setAttribute('data-user-id', request.user.user_id);
            row.innerHTML = `
                <td>${request.user.email}</td>
                <td>${request.user.name}</td>
                <td><button type="button" class="doctor_main-button" onclick="cancelRequest(${request.doctor_id}, '${request.user.user_id}')">요청 취소</button></td>
            `;
            requestTable.appendChild(row);
        });
   
}

//페이지 로드 시 요청 보낸 목록을 불러옴
document.addEventListener('DOMContentLoaded', async function() {
    const token = localStorage.getItem('token');

    if (token) {
        fetch('/doctor/getRequestList', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            loadRequestList(data);
        })
    }
    else {
        window.location.href = '/user/login';
    }

});

// 환자 마이페이지 열람 기능
function viewPatient(userId) {
    window.location.href = `/doctor/board/${userId}`;
}


