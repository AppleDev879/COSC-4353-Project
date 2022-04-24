import React from 'react'
import Cookies from 'js-cookie';

import "./Fuelquoteform.css"

class FuelQuoteForm extends React.Component {

    dateString = (date) => {
        var mm = date.getMonth() + 1; // getMonth() is zero-based
        var dd = date.getDate();

        return [date.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
        ].join('-');
    }

    constructor(props) {
        super(props);
        // TODO: just for testing, delete later
        Cookies.set('userId', 1)

        // Get today's date
        var date = new Date();
        // Set date to 3 days into the future
        date.setDate(date.getDate() + 3);
        const ds = this.dateString(date);
        this.state = {
            gallons: 500,
            deliveryDate: ds,
            total: 0.00,
            userId: Cookies.get('userId'),
            ppg: 0.00,
            //Set by the client profile
            delivery_address: "2123 Glover Way",
            returningCustomer: false,
            rows: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    updateTable(callback) {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:3001/api/history/${this.state.userId}`);
            if (!res.ok) {
                throw new Error('Data could not be fetched');
            } else {
                return res.json();
            }
        }
        fetchData().then((res) => {
            this.setState({
                rows: res
            }, () => {
                if (callback) {
                    callback();
                }
            });
        })
            .catch((e) => console.log(e.message));
    }

    getUserAddress() {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:3001/api/address/${this.state.userId}`);
            if (!res.ok) {
                throw new Error('User address could not be fetched');
            } else {
                return res.json();
            }
        }
        fetchData().then((res) => {
            this.setState({ delivery_address: res });
            console.log(res);
        }).catch((e) => console.log(e.message));
    }

    componentDidMount() {
        document.title = "Price Quote Form";
        this.updateTable();
        this.getUserAddress();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    validateForm = () => {
        var valid = true;
        var gallons = this.state.gallons;
        const maxGallons = 500000
        if (isNaN(gallons) || gallons < 0 || gallons > maxGallons) {
            alert("Please enter a value for gallons between 0 and 500,000");
            valid = false;
        }

        var now = new Date();
        now.setDate(now.getDate() - 1);
        var comps = this.state.deliveryDate.split("-");
        var deliveryDate = new Date(comps[0], comps[1] - 1, comps[2]);
        if (deliveryDate < now) {
            alert("Please select a date in the future.");
            valid = false;
        }
        return valid;
    }

    handleGetQuote = (event) => {
        event.preventDefault();
        if (this.validateForm()) {
            const query = async () => {
                const res = await fetch(`http://localhost:3001/api/getquote/${this.state.userId}/${this.state.gallons}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    }
                });
                return res.json();
            }
            query().then((res) => {
                if (res.error) {
                    alert(res.error);
                } else {
                    // update the total here
                    this.setState({
                        ppg: res.suggested,
                        total: res.total,
                        returningCustomer: res.returning
                    }, () => {
                        console.log(res);
                    });
                }
            })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()

        if (this.validateForm()) {

            const item = {
                quote_date: this.dateString(new Date()),
                delivery_date: this.state.deliveryDate,
                delivery_address: this.state.delivery_address,
                gallons: this.state.gallons,
                userId: this.state.userId
            };
            // Post row to backend
            const submit = async () => {
                var formData = JSON.stringify(item);
                const res = await fetch('http://localhost:3001/api/history', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: formData
                });
                return res.json();
            }
            submit().then((res) => {
                if (res.error) {
                    alert(res.error);
                } else {
                    this.setState({
                        ppg: res.suggested,
                        total: res.total,
                        returningCustomer: res.returning
                    }, () => {
                        this.updateTable(() => {
                            console.log(res);
                            alert(`Thank you for your order. You will receive it by ${this.state.deliveryDate}.`);
                        });
                    });
                }
            });
        }
    }

    heading = [
        {
            id: 0,
            label: "Quote Date"
        },
        {
            id: 1,
            label: "Gallons"
        },
        {
            id: 2,
            label: "Delivery Date"
        },
        {
            id: 3,
            label: "Delivery Address"
        },
        {
            id: 4,
            label: "PPG"
        },
        {
            id: 5,
            label: "Total"
        }];

    // From: https://stackoverflow.com/a/55556258/817946
    currencyFormat(num) {
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    commaFormat(num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    tableDateString(sqldate) {
        const tableDate = new Date(sqldate);
        const today = new Date();

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        var output = tableDate.toDateString();
        if (tableDate.toDateString() === yesterday.toDateString()) {
            output = "yesterday";
        } else if (tableDate.toDateString() === today.toDateString()) {
            output = "today";
        }
        return output;
    }

    render() {
        return (
            <div className="container" >
                <div className="quoteForm">
                    <h2 className="pricing">Pricing Form</h2>
                    <form onSubmit={this.handleSubmit}>
                        <label className="labels">Gallons:
                            <input type="number"
                                className="numberOfGallons"
                                value={this.state.gallons}
                                name="gallons"
                                onChange={(e) => this.handleInputChange(e)}
                            />
                        </label>
                        <br />
                        <label className="labels">
                            Delivery Address:
                            <input type="text"
                                className="deliveryAddress"
                                value={this.state.delivery_address}
                                readOnly={true}
                                disabled={true}
                            />
                        </label>
                        <br />
                        <label className="labels">Delivery date
                            <input type="date"
                                className="deliveryDate"
                                name="delivery_date"
                                value={this.state.deliveryDate}
                                onChange={(e) => this.handleInputChange(e)}
                            />
                        </label>
                        <br />
                        <label className="labels">Price per gallon
                            <input
                                className="pricePerGallon"
                                value={this.state.ppg === 0.0 ? "Get quote" : this.state.ppg}
                                readOnly={true}
                                disabled={true}
                            />
                        </label>
                        <p hidden={!this.state.returningCustomer}>Thank you for being a repeat customer. You have received a small discount on today's order.</p>
                        <br />
                        <div class="center">
                        <input type="button" value="Get Quote" onClick={this.handleGetQuote} />
                        <input type="submit" />
                        </div>
                    </form>
                    <h4 className="totalPrice">Total: {this.currencyFormat(this.state.total)}</h4>
                </div>
                <h3>History for User ID {this.state.userId}</h3>
                <div className="table-container">
                    <table className="quote-table">
                        <thead>
                            <tr key="head" >
                                {this.heading.map((item, key) => {
                                    return (
                                        <td key={key}><center>{item.label}</center></td>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.rows.map((item, key) => {
                                return (
                                    <tr id="addr0" key={key} >
                                        <td><center>{this.tableDateString(item.quote_date)}</center></td>
                                        <td><center>{this.commaFormat(item.gallons)}</center></td>
                                        <td><center>{this.tableDateString(item.delivery_date)}</center></td>
                                        <td><center>{item.delivery_address}</center></td>
                                        <td><center>{this.currencyFormat(item.ppg)}</center></td>
                                        <td><center>{this.currencyFormat(item.total)}</center></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div >
            </div>
        )
    }
}

export default FuelQuoteForm;