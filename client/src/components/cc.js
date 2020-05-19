class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        users: [
          { firstName: 'John1', middleName: 'Daniel1', lastName: 'Paul1' },
          { firstName: 'John2', middleName: 'Daniel2', lastName: 'Paul2' },
          { firstName: 'John3', middleName: 'Daniel3', lastName: 'Paul3' },
          { firstName: 'John4', middleName: 'Daniel4', lastName: 'Paul4' },
        ],
      };
    }
    _onChangeUser = (index, field, event) => {
      const newValue = event.target.value;
      this.setState(state => {
        const users = [
          ...state.users.slice(0, index),
          {
            ...state.users[index],
            [field]: newValue,
          },
          ...state.users.slice(index + 1),
        ];
        return {
          users,
        };
      });
    };
    _onSubmit = event => {
      event.preventDefault();
      console.log(this.state.users);
    };
  
    render() {
      return (
        <div className="App">
          <form onSubmit={this._onSubmit}>
            {this.state.users.map((user, index) => (
              <div key={index}>
                <input
                  value={user.firstName}
                  onChange={this._onChangeUser.bind(this, index, 'firstName')}
                />
                <input
                  value={user.middleName}
                  onChange={this._onChangeUser.bind(this, index, 'middleName')}
                />
                <input
                  value={user.lastName}
                  onChange={this._onChangeUser.bind(this, index, 'lastName')}
                />
              </div>
            ))}
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    }
  }
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );