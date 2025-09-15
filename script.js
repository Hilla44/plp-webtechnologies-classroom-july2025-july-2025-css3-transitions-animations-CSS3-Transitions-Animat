 
        // ===== PART 2: JAVASCRIPT FUNCTIONS =====
        
        // ===== PART 3: COMBINING CSS & JAVASCRIPT =====
        
        // Function to trigger CSS animations
        function triggerAnimation(animationType) {
            const element = document.getElementById('targetElement');
            
            // Reset classes to ensure animation can be triggered again
            element.className = 'animation-target';
            
            // Add the requested animation class
            switch(animationType) {
                case 'rotate':
                    element.classList.add('rotate');
                    break;
                case 'expand':
                    element.classList.add('expand');
                    break;
                case 'color-change':
                    element.classList.add('color-change');
                    break;
                case 'shake':
                    element.classList.add('shake');
                    // Remove shake class after animation completes
                    setTimeout(() => {
                        element.classList.remove('shake');
                    }, 500);
                    break;
            }
        }
        
        // Card flip function
        function flipCard() {
            const card = document.getElementById('card');
            card.classList.toggle('flipped');
        }
        
        // Modal functions
        function openModal() {
            const modal = document.getElementById('modal');
            modal.classList.add('show');
        }
        
        function closeModal() {
            const modal = document.getElementById('modal');
            modal.classList.remove('show');
        }
        
        // Initialize with some animations
        document.addEventListener('DOMContentLoaded', function() {
            // Trigger the slide animation on page load
            const elements = document.querySelectorAll('.slide-animation');
            
            // Calculate and display results on page load
            calculate();
        });
    





         // DOM elements
        const metricOption = document.getElementById('metric-option');
        const imperialOption = document.getElementById('imperial-option');
        const metricInputs = document.getElementById('metric-inputs');
        const imperialInputs = document.getElementById('imperial-inputs');
        const calculateBtn = document.getElementById('calculate-btn');
        const resultDiv = document.getElementById('result');
        const bmiValue = document.getElementById('bmi-value');
        const bmiCategory = document.getElementById('bmi-category');
        const bmiPointer = document.getElementById('bmi-pointer');
        
        // Unit system toggle
        metricOption.addEventListener('click', () => {
            metricOption.classList.add('active');
            imperialOption.classList.remove('active');
            metricInputs.style.display = 'block';
            imperialInputs.style.display = 'none';
        });
        
        imperialOption.addEventListener('click', () => {
            imperialOption.classList.add('active');
            metricOption.classList.remove('active');
            imperialInputs.style.display = 'block';
            metricInputs.style.display = 'none';
        });
        
        // Calculate BMI
        calculateBtn.addEventListener('click', () => {
            let bmi;
            
            if (metricOption.classList.contains('active')) {
                // Metric calculation
                const height = parseFloat(document.getElementById('height').value);
                const weight = parseFloat(document.getElementById('weight').value);
                
                if (!height || !weight || height <= 0 || weight <= 0) {
                    alert('Please enter valid height and weight values.');
                    return;
                }
                
                // BMI formula: weight (kg) / (height (m))²
                const heightInMeters = height / 100;
                bmi = weight / (heightInMeters * heightInMeters);
            } else {
                // Imperial calculation
                const feet = parseFloat(document.getElementById('height-ft').value);
                const inches = parseFloat(document.getElementById('height-in').value);
                const weightLb = parseFloat(document.getElementById('weight-lb').value);
                
                if (!feet || !weightLb || feet <= 0 || weightLb <= 0) {
                    alert('Please enter valid height and weight values.');
                    return;
                }
                
                // Convert to total inches
                const totalInches = (feet * 12) + (inches || 0);
                
                // BMI formula: (weight (lb) / (height (in))²) * 703
                bmi = (weightLb / (totalInches * totalInches)) * 703;
            }
            
            // Round to one decimal place
            bmi = Math.round(bmi * 10) / 10;
            
            // Display result
            bmiValue.textContent = bmi;
            
            // Determine category
            let category, categoryColor;
            if (bmi < 18.5) {
                category = 'Underweight';
                categoryColor = '#3498db';
            } else if (bmi >= 18.5 && bmi < 25) {
                category = 'Normal weight';
                categoryColor = '#2ecc71';
            } else if (bmi >= 25 && bmi < 30) {
                category = 'Overweight';
                categoryColor = '#f1c40f';
            } else {
                category = 'Obesity';
                categoryColor = '#e74c3c';
            }
            
            bmiCategory.textContent = category;
            bmiCategory.style.color = categoryColor;
            
            // Position pointer on scale (BMI range: 15 to 40)
            const scalePosition = Math.min(Math.max((bmi - 15) / (40 - 15) * 100, 0), 100);
            bmiPointer.style.left = `${scalePosition}%`;
            
            // Show result
            resultDiv.style.display = 'block';
        });
        
        // Allow Enter key to calculate
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                calculateBtn.click();
            }
        });
    