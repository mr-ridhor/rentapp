import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Register.css'
import '../Styles/loan.css'


const Dashboard = ({history}) => {
    const [error, setError] = useState("")
 
    const [userValues, setUserValues] = useState({
        amount: '',
        interest: '',
        months: '',
    })
   
    const [results, setResults] = useState({
        monthlyPayment: '',
        totalPayment: '',
        totalInterest: '',
        isResult: false,
    });
    const [formStep, setFormStep] = useState(0)

    const completeformStep = () => {
        setFormStep(cur => cur + 1);
    }
    const handleInputChange = (event) => {
        setUserValues({
            ...userValues,
            [event.target.name]: event.target.value
        });
    }


    // const handleSubmitValues = (e) => {
    //     e.preventDefault();
    //     console.log(userValues);
    //     calculateResults(userValues);
    // };
    const renderButton = () => {
        if (formStep > 2) {
            return undefined
        } else if (formStep === 0) {
            return (<button style={{ marginTop: "20px" }} onClick={completeformStep} type="button"
                className="btn btn-primary"> Next Step</button>)
        } else if (formStep === 1) {
            return (
                <div>
                    <input type='submit' />
                    <button
                        type="button" style={{ marginTop: "20px" }} onClick={completeformStep}
                        className="btn btn-primary">Next Step</button>
                </div>)
        } else {
            return (<button style={{ marginTop: "20px" }} onClick={completeformStep} type="button"
                className="btn btn-primary">Accept </button>)
        }
    }
    const calculateResults = ({ amount, interest, months }) => {
        const userAmount = Number(amount);
        const calculatedInterest = Number(interest) / 100;
        const calculatedPayments = Number(months) * 1;
        const x = Math.pow(1 + calculatedInterest, calculatedPayments);
        const monthly = (userAmount * x * calculatedInterest) / (x - 1);

        if (isFinite(monthly)) {
            const monthlyPaymentCalculated = Math.ceil(monthly);
            const totalPaymentCalculated = (Math.ceil(monthly * calculatedPayments));
            const totalInterestCalculated = (Math.ceil(monthly * calculatedPayments - userAmount));

            // Set up results to the state to be displayed to the user
            setResults({
                monthlyPayment: monthlyPaymentCalculated,
                totalPayment: totalPaymentCalculated,
                totalInterest: totalInterestCalculated,
                isResult: true,
            });
        }
        return;
    }

    

    const handleSubmitValues = async (e) => {
        e.preventDefault()
        console.log(userValues);
        calculateResults(userValues);

        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }
        try {
            const { data } = await axios.post("api/loan/apply",
                {
                    amount: userValues.amount,
                    tenure: userValues.months,
                    rate: userValues.interest,
                    monthlyPayment: results.monthlyPayment
                }, config)
            console.log({
                amount: userValues.amount,
                tenure: userValues.months,
                rate: userValues.interest,
                monthlyPayment: results.monthlyPayment
            })
            localStorage.setItem("authToken", data.token)
            
        } catch (error) {
            setError("Error")
            setTimeout(() => {
                setError("")
            }, 5000)

        }
    }
    return (
        <div className="register">
            <form onSubmit={handleSubmitValues} className="register__form">
                <h3 className="register__title"> My Rent</h3>
                {error && <span className="error-message">{error}</span>}

                {formStep === 0 && (
                    <>
                        <div className="form-group bt">
                            <label htmlFor="email">What is your accoummodation status?</label>
                            <div style={{ textAlign: 'center' }}>
                                <button onChange={handleInputChange} style={{ borderColor: 'teal', paddingTop: "10px",marginTop:"5px", height: "40px", borderRadius: "5px", width: "150px" }} type="submit" value="Submit">Looking for new place</button><br />
                                <button onChange={handleInputChange} style={{ borderColor: 'coral', paddingTop: "10px", height: "40px",marginTop:"5px", borderRadius: "5px", width: "150px" }} type="submit" value="Submit">Want to renew my rent</button><br />
                                <button onChange={handleInputChange} style={{ borderColor: 'grey', height: "40px",borderWidth:".5px", marginTop:"5px",borderRadius: "5px", width: "150px" }} type="submit" value="Submit">Still searching</button><br />
                            </div>


                        </div>
                        <div className="form-group">
                            <label htmlFor="email">How much is your monthly income?</label>
                            <input type="text"
                                placeholder="Enter amount"
                                required

                                id="amount" onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">How much is your rent request?</label>
                            <input type="text" name="amount"
                                placeholder="Enter amount"

                                required id="amount" onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="months">Monthly plans</label>
                            <select id="months" name="months" onChange={handleInputChange}>
                                <option value="" disabled selected>Choose your option</option>
                                <option id="months" name="months" onChange={handleInputChange} value="1">1 month</option>
                                <option id="months" name="months" onChange={handleInputChange} value="2">2 months</option>
                                <option id="months" name="months" onChange={handleInputChange} value="3">3 months</option>
                                <option id="months" name="months" onChange={handleInputChange} value="4">4 months</option>
                            </select>
                        </div>

                    </>
                )}
                {formStep === 1 && (
                    <>

                        <div className="form-group">
                            <label htmlFor="amount">How much is your rent request?</label>
                            <input type="text"
                                placeholder="Enter amount"
                                name="amount"
                                onChange={handleInputChange}
                                value={userValues.amount}
                                required id="amount" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="interest">interest rate</label>
                            <input type="text"
                                placeholder="interest"
                                name="interest"
                                value={userValues.interest}
                                required id="amount" onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="months">Months</label>
                            <input type="text"

                                placeholder="months"
                                name="months"
                                onChange={handleInputChange}
                                value={userValues.months}
                                required id="months" />
                        </div>
                    </>
                )}
                {formStep === 2 && (
                    <>
                        <div className="form-group">
                            <label htmlFor="amount">Amount to request:</label>
                            <input type="text"
                                placeholder="Enter amount"
                                required id="amount"

                                onChange={handleInputChange} />
                        </div>
                        <div className="form-group" style={{ width: "200px", flexDirection: "column" }}>
                            <label htmlFor="interest">Monthly plans</label>
                            <select onChange={handleInputChange} >
                                <option id="interest" value="" disabled selected>Choose your option</option>
                                <option id="interest" value="1">1 month</option>
                                <option id="interest" value="2">2 months</option>
                                <option id="interest" value="3">3 months</option>
                            </select>
                        </div>
                        <div className="card">
                            <p>Pre-approved amount :<span style={{ paddingLeft: '60px' }}>{userValues.amount}</span></p>
                            <p>Monthly Payment: <span style={{ paddingLeft: '100px' }}>{results.monthlyPayment}</span></p>
                            <p>Tenor: <span style={{ paddingLeft: '90px' }}></span>{userValues.months}</p>


                        </div>
                    </>
                )}
                {formStep === 3 && (
                    <div className="form-group">
                        <h2 style={{ fontSize: "bold" }}>Submitted!</h2>
                    </div>
                )}
                {renderButton()}
            </form>
            
        </div>
    )
}

export default Dashboard;
