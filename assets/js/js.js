function toggleDropdown() {
    const dropdownContent = document.getElementById("dropdown-content");
    dropdownContent.classList.toggle("show");
}

function updateSelectedOptions() {
    const checkboxes = document.querySelectorAll('#dropdown-content input[type="checkbox"]');
    let selectedOptions = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedOptions.push({
                value: checkbox.value,
                text: checkbox.nextSibling.textContent.trim()
            });
        }
    });

    const output = document.getElementById("output");
    output.innerHTML = '';

    if (selectedOptions.length > 0) {
        selectedOptions.forEach(option => {
            const optionDiv = document.createElement("div");
            optionDiv.className = 'option-div';
            optionDiv.innerHTML = option.text + ' <span class="remove-btn" onclick="removeOption(this, \'' + option.value + '\')">x</span>';
            output.appendChild(optionDiv);
        });
    }
}

function removeOption(element, value) {
    element.parentElement.remove();

    const checkboxes = document.querySelectorAll('#dropdown-content input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        if (checkbox.value === value) {
            checkbox.checked = false;
        }
    });

    updateSelectedOptions();
}

function toggleDropdowncolor() {
    const dropdownContent = document.getElementById("dropdown_content");
    dropdownContent.classList.toggle("showcolor");
}

function updateSelectedOptionscolor() {
    const checkboxes = document.querySelectorAll('#dropdown_content input[type="checkbox"]');
    let selectedOptionscolor = [];

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedOptionscolor.push({
                value: checkbox.value,
                text: checkbox.nextSibling.textContent.trim()
            });
        }
    });

    const outputcolor = document.getElementById("outputcolor");
    outputcolor.innerHTML = '';

    if (selectedOptionscolor.length > 0) {
        selectedOptionscolor.forEach(option => {
            const optionDiv = document.createElement("div");
            optionDiv.className = 'option-divcolor';
            optionDiv.innerHTML = option.text + ' <span class="remove-btncolor" onclick="removeOptioncolor(this, \'' + option.value + '\')">x</span>';
            outputcolor.appendChild(optionDiv);
        });
    }
}

function removeOptioncolor(element, value) {
    element.parentElement.remove();

    const checkboxes = document.querySelectorAll('#dropdown_content input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        if (checkbox.value === value) {
            checkbox.checked = false;
        }
    });

    updateSelectedOptionscolor();
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#dropdown-content input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectedOptions);
    });

    document.querySelectorAll('#dropdown_content input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectedOptionscolor);
    });

    updateSelectedOptions();     
    updateSelectedOptionscolor(); 
});

$(document).ready(function() {
    // Khi chọn màu
    $('.color-option').on('click', function(e) {
        e.preventDefault();
        var selectedColorId = $(this).data('color-id'); // Lấy id của màu được chọn
        $('#selected-color').val(selectedColorId); // Lưu vào input ẩn
        $('.color-option').removeClass('selected'); // Xóa class 'selected' khỏi các màu khác
        $(this).addClass('selected'); // Đánh dấu màu được chọn
    });

    // Khi chọn kích thước
    $('.size-option').on('click', function(e) {
        e.preventDefault();
        var selectedSizeId = $(this).data('size-id'); // Lấy id của size được chọn
        $('#selected-size').val(selectedSizeId); // Lưu vào input ẩn
        $('.size-option').removeClass('selected'); // Xóa class 'selected' khỏi các kích thước khác
        $(this).addClass('selected'); // Đánh dấu kích thước được chọn
    });
});

var pathParts = window.location.pathname.split('/'); 
const numberPage=document.querySelector('#page')
const number=numberPage.value;
function prev() {
        if(parseInt(pathParts[3])==1){
            var link = document.getElementById('prev'); 
            link.href = '/product/page/1'; 
            var link1 = document.getElementById('next'); 
            link1.href = '/product/page/'+ (parseInt(pathParts[3])+1); 
                }else{
                var link = document.getElementById('prev'); 
                link.href = '/product/page/'+ (parseInt(pathParts[3])-1); 
                var link1 = document.getElementById('next'); 
                link1.href = '/product/page/'+ (parseInt(pathParts[3])+1);   
                }
        return 0;
};

function next() {
        if(parseInt(pathParts[3])==number){
            var link = document.getElementById('prev'); 
            link.href = '/product/page/'+ (parseInt(pathParts[3])-1); 
            var link1 = document.getElementById('next'); 
            link1.href = '/page/'+ number; 
        }else{
            var link = document.getElementById('prev'); 
            link.href = '/product/page/'+ (parseInt(pathParts[3])-1); 
            var link1 = document.getElementById('next'); 
            link1.href = '/product/page/'+ (parseInt(pathParts[3])+1);   
        }
        return 0;
};
