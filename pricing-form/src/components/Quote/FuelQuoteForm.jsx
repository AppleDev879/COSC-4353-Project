import React from 'react'
import "./Fuelquoteform.css"

class FuelQuoteForm extends React.Component {

    constructor(props) {
        super(props);
        Date.prototype.yyyymmdd = function () {
            var mm = this.getMonth() + 1; // getMonth() is zero-based
            var dd = this.getDate();

            return [this.getFullYear(),
            (mm > 9 ? '' : '0') + mm,
            (dd > 9 ? '' : '0') + dd
            ].join('-');
        };

        var date = new Date();
        this.state = {
            gallons: 0,
            deliveryDate: date.yyyymmdd(),
            total: 0.00,

            // Set by the pricing module
            ppg: 34.34,

            //Set by the client profile
            deliveryAddress: "2123 Glover Way",
            rows: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
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
        var date = new Date();
        const item = {
            quoteDate: date.yyyymmdd(),
            deliveryDate: this.state.deliveryDate,
            deliveryAddress: this.state.deliveryAddress,
            gallons: this.state.gallons,
            total: this.state.total,
            ppg: this.state.ppg
        };
        this.setState({
            rows: [item].concat(this.state.rows)
        });
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
        var comps = this.state.deliveryDate.split("-");
        var deliveryDate = new Date(comps[0], comps[1] - 1, comps[2]);
        if (deliveryDate < now) {
            alert("Please select a date in the future.");
            valid = false;
        }

        if (valid) {
            this.setState({
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
                                value={this.state.deliveryAddress}
                                readOnly={true}
                            />
                        </label>
                        <br />
                        <label>Delivery date
                            <input type="date"
                                className="deliveryDate"
                                name="deliveryDate"
                                value={this.state.date}
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
                                        <td><center>{item.quoteDate}</center></td>
                                        <td><center>{item.gallons}</center></td>
                                        <td><center>{item.deliveryDate}</center></td>
                                        <td><center>{item.deliveryAddress}</center></td>
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