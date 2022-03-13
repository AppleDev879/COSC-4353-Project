import React from 'react'
import "./Fuelquoteform.css"

function dateString(date) {
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();

    return [date.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
    ].join('-');
}

class FuelQuoteForm extends React.Component {

    constructor(props) {
        super(props);

        // Get today's date
        var date = new Date();
        // Set date to 3 days into the future
        date.setDate(date.getDate() + 3);
        const ds = dateString(date);
        this.state = {
            gallons: 5,
            delivery_date: ds,
            total: 0.00,

            // Set by the pricing module
            ppg: 34.34,

            //Set by the client profile
            delivery_address: "2123 Glover Way",
            rows: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    updateTable() {
        const fetchData = async () => {
            const res = await fetch('http://localhost:3001/api/history');
            if (!res.ok) {
                throw new Error('Data could not be fetched');
            } else {
                return res.json();
            }
        }
        fetchData().then((res) => {
            this.setState({
                rows: res
            });
            console.log(res);
        })
            .catch((e) => console.log(e.message));
    }

    componentDidMount() {
        this.updateTable();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleAddRow = () => {
        const item = {
            quote_date: dateString(new Date()),
            delivery_date: this.state.delivery_date,
            delivery_address: this.state.delivery_address,
            gallons: this.state.gallons,
            total: this.state.total,
            ppg: this.state.ppg
        };
        // Post row to backend
        const postData = async () => {

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
        postData().then((res) => {
            if (res.error) {
                alert(res.error);
            } else {
                this.updateTable();
                console.log(res);
            }
        })
    };

    handleSubmit = (event) => {
        event.preventDefault()
        var valid = true;
        var gallons = this.state.gallons;
        if (isNaN(gallons) || gallons < 0 || gallons > 5000) {
            alert("Please enter a value for gallons between 0 and 5000");
            valid = false;
        }

        var now = new Date();
        now.setDate(now.getDate() - 1);
        var comps = this.state.delivery_date.split("-");
        var deliveryDate = new Date(comps[0], comps[1] - 1, comps[2]);
        if (deliveryDate < now) {
            alert("Please select a date in the future.");
            valid = false;
        }

        if (valid) {
            this.setState({
                // Submit the new entry to the backend

                total: Math.round(this.state.ppg * this.state.gallons * 100) / 100
            }, function () {
                this.handleAddRow();
            })
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

    render() {
        return (
            <div className="container" >
                <div className="quoteForm">
                    <h3>Pricing Form</h3>
                    <form onSubmit={this.handleSubmit}>
                        <label>Gallons:
                            <input type="number"
                                className="numberOfGallons"
                                value={this.state.gallons}
                                name="gallons"
                                onChange={(e) => this.handleInputChange(e)}
                            />
                        </label>
                        <br />
                        <label>
                            Delivery Address:
                            <input type="text"
                                className="deliveryAddress"
                                value={this.state.delivery_address}
                                readOnly={true}
                            />
                        </label>
                        <br />
                        <label>Delivery date
                            <input type="date"
                                className="deliveryDate"
                                name="delivery_date"
                                value={this.state.delivery_date}
                                onChange={(e) => this.handleInputChange(e)}
                            />
                        </label>
                        <br />
                        <label>Price per gallon
                            <input
                                className="pricePerGallon"
                                value={this.state.ppg}
                                readOnly={true}
                            />
                        </label>
                        <br />
                        <input type="submit" />
                    </form>
                    <h4 className="totalPrice">{this.currencyFormat(this.state.total)}</h4>
                </div>
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
                                        <td><center>{item.quote_date}</center></td>
                                        <td><center>{item.gallons}</center></td>
                                        <td><center>{item.delivery_date}</center></td>
                                        <td><center>{item.delivery_address}</center></td>
                                        <td><center>{item.ppg}</center></td>
                                        <td><center>{item.total}</center></td>
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