function Person() {
    return React.createElement(
        "div",
        { className: "person" },
        React.createElement(
            "h1",
            null,
            "DUDE"
        ),
        React.createElement(
            "p",
            null,
            "Your age: 28"
        )
    );
}

ReactDOM.render(React.createElement(Person, null), document.querySelector('#p1'));