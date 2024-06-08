const checkForUpdates = async () => {
    const response = await fetch('http://localhost:3000/latest-version');
    const data = await response.json();
    const currentVersion = '1.0.0'; // Example current version

    if (data.version !== currentVersion) {
        console.log('Update available:', data);
        // Download and install the update as per your application logic
    } else {
        console.log('No updates available.');
    }
};

checkForUpdates();
