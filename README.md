# Update Server with Express.js

This project implements an update server using Express.js on Node.js. The server allows users to upload multiple files with version numbers and change descriptions. It generates a JSON file containing version information and links to the uploaded files. Users can check if an update is available by hitting an API endpoint and can download the latest version files.

## Features

- Upload multiple files with version numbers and change descriptions.
- Generate a JSON file containing version information and file links.
- Serve static files for downloading uploaded files.
- API to get the latest version information.

## Prerequisites

- Node.js installed on your machine.
- npm (Node Package Manager) installed.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/update-server.git
   cd update-server
   ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Create necessary directories:
    ```sh
    mkdir -p uploads versions
    ```

4. Start the server:

    ```sh
    node index.js
    ```

5. Access the home page in your browser:

    ```
    http://localhost:3000
    ```

6. Upload files using the form on the home page.

7. Check the latest version information:
    ```
    http://localhost:3000/latest-version
    ```

#### Response
```json
{
  "version": "1.0.1",
  "changes": "Bug fixes",
  "files": [
    {
      "filename": "app-arm64-v8a-release.apk",
      "path": "/uploads/app-arm64-v8a-release.apk"
    },
    {
      "filename": "app-armeabi-v7a-release.apk",
      "path": "/uploads/app-armeabi-v7a-release.apk"
    },
    {
      "filename": "app-x86_64-release.apk",
      "path": "/uploads/app-x86_64-release.apk"
    }
  ]
}
```

8. Get files of application

  ```
  http://localhost:3000/uploads/app-x86_64-release.apk
  ```


