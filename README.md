# DZ Terminal

## Welcome
The terminal is a light weigth website that emulates a linux terminal.

## Intro
You can download the code and execute this with in your IDE with the extention Live Server.

## Commands
In the terminal you can now execute preset commands or make your own. Here are some preset commands:
- echo
- sudo
- ls / dir
- passwrd (Needs to be installed with dzpkm)
- dzpkm
- setenv
- rm

## Development
You can make your own packages and its easy.

### Create a package
First you need to create a folder in the lib directory.

!!! USE A SCHEMA !!!
You can name your package like com.username.appName
Its better to recognize and doesn't interfear if you would name your package appName, because another can also name his package appName the same and then the programm wouldn't know which to execute

### Create the index.js
In every package folder root needs to be a index.js
Copy the code for the exporting and recognition of your script.

```
export function processCommand(command) {
    // Useing args is a easier way to process commands
    const args = command.split(" ");

    // Example: command contains "appName value"
    // Args is an array: ["appName", "value"]

    let myPackage = libs.find(packages => packages.command === args[0]); // Find your package useing your command
    let searchArg = args[1]; // Specify the range whre your switch satement should start the search

    switch (searchArg) {
        // Display the version of your app
        case "-v":
            printToTerminal(`appName is version: ${myPackage["package.version"]} in branch ${myPackage.branch}`);
            break;
        // If none of the above match the execute something like a helping command
        default:
            printToTerminal("Type appName -v for the appName version"); // Print a message to the console
            break;
    }
}
```

### Adding your library
That it now you need to add your package to the apt.json.
Copy the code if needed:
```
    {
        "command": "appCommand",
        "package.version": "appVersion",
        "package.name": "com.username.appName",
        "package.size": 0,
        "package.author": "Username"
    }
```

### Install libraries (dzpkm)
After you did that enter the following command in to the terminal on your localhost
```
    dzpkm install com.username.appName
```

What does the command:
- The first argument is "dzpkm" this is the package manager, where you can uninstall and install packages from the apt.json
- Second the install argument says that the dzpkm has to install a package
- Last argument is the package

### Use your library
Now you can type in the command in the terminal. If not changed its appCommand.
```
    appCommand
```
executing runs the loadLib function and import your script and executes your script.
