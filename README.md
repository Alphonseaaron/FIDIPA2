# FIDIPA Website cPanel Deployment

This guide provides instructions for deploying the FIDIPA static website, located in the `new_static_site/` directory, to a cPanel hosting environment.

## Prerequisites

1.  **cPanel Access:** You need login credentials for your cPanel account.
2.  **Domain Name:** Your domain name should be configured and pointing to your hosting account.
3.  **Website Files:** You should have the contents of the `new_static_site/` directory ready. This includes all HTML, CSS, JavaScript files, and the `assets/` folder with images.

## Deployment Steps

There are a few common ways to upload files to cPanel. The File Manager is generally the most straightforward for static sites.

### Method 1: Using cPanel File Manager (Recommended)

1.  **Prepare Your Files:**
    *   Navigate to the `new_static_site/` directory on your local machine.
    *   Select all files and folders within `new_static_site/` (i.e., `index.html`, `gallery.html`, `programs.html`, `css/`, `js/`, `assets/`, and any other files like `vite.svg`).
    *   Compress these selected files and folders into a single ZIP file (e.g., `fidipa-website.zip`). **Important:** Make sure you are zipping the *contents* of `new_static_site/`, not the `new_static_site/` folder itself. When unzipped on the server, the files should be directly in the target directory (e.g., `public_html/index.html`, not `public_html/new_static_site/index.html`).

2.  **Log in to cPanel:**
    *   Open your web browser and go to your cPanel URL (usually `http://yourdomain.com/cpanel` or `http://cpanel.yourdomain.com`).
    *   Enter your cPanel username and password.

3.  **Open File Manager:**
    *   In the cPanel dashboard, find the "Files" section and click on "File Manager."

4.  **Navigate to the Root Directory:**
    *   The File Manager will open in a new tab or window.
    *   You need to navigate to the document root directory for your website. This is typically `public_html` or `www`. If you are deploying to a subdomain or addon domain, the directory might be different (e.g., `public_html/subdomain_folder`). Double-check your domain's configuration in cPanel if unsure.

5.  **Upload the ZIP File:**
    *   Once in the correct directory (e.g., `public_html`), click on the "Upload" icon in the File Manager's toolbar.
    *   On the upload page, click "Select File" and choose the ZIP file you created in Step 1 (e.g., `fidipa-website.zip`).
    *   Wait for the upload to complete. You should see a progress bar.

6.  **Extract the ZIP File:**
    *   Go back to the File Manager tab. You should see the uploaded ZIP file.
    *   Select the ZIP file by clicking on it once.
    *   Click on the "Extract" icon in the toolbar.
    *   A dialog will appear asking where to extract the files. Ensure the path is correct (e.g., `/public_html`). Click "Extract File(s)".

7.  **Verify Deployment:**
    *   Open your website in a browser (e.g., `http://yourdomain.com`).
    *   Check that all pages, images, and styles load correctly.
    *   If files are in a subdirectory (e.g., `public_html/new_static_site/`), you may need to move them up to the main `public_html` directory or adjust your domain's document root if you intended them to be at the root. The goal is typically to have `index.html` directly inside `public_html/`.

8.  **Clean Up (Optional):**
    *   You can delete the uploaded ZIP file from the File Manager to save space.

### Method 2: Using FTP (File Transfer Protocol)

If you prefer using an FTP client (like FileZilla, Cyberduck, or WinSCP):

1.  **Get FTP Credentials:**
    *   In cPanel, find the "FTP Accounts" section.
    *   You can use an existing FTP account or create a new one. Note the FTP server (hostname), username, and password. The port is usually 21.

2.  **Connect with FTP Client:**
    *   Open your FTP client and enter the server/hostname, username, password, and port.
    *   Connect to the server.

3.  **Navigate to the Root Directory:**
    *   In the remote site panel of your FTP client, navigate to your website's document root (e.g., `public_html`).

4.  **Upload Files:**
    *   In the local site panel of your FTP client, navigate to your `new_static_site/` directory.
    *   Select all files and folders *inside* `new_static_site/`.
    *   Drag and drop them or use the upload function to transfer them to the remote root directory (`public_html`).
    *   Ensure that the directory structure is maintained.

5.  **Verify Deployment:**
    *   Open your website in a browser to ensure everything is working as expected.

## Troubleshooting

*   **Incorrect File Paths:** If images or CSS are not loading, double-check that all paths in your HTML/CSS files are relative and correct for the server structure. The current setup uses relative paths like `assets/random_image_1.jpg` or `css/style.css`, which should work if `index.html` is in the root of `public_html` and `assets/` and `css/` are direct subdirectories.
*   **Permissions:** Rarely, file permissions might be an issue. cPanel's File Manager usually handles this, but ensure files are readable by the webserver (typically permissions like 644 for files and 755 for directories).
*   **Caching:** If you've uploaded new files but see old content, try clearing your browser cache or using a private/incognito window.
*   **.htaccess file:** If you have specific redirect or rewrite rules, ensure your `.htaccess` file (if any) is correctly configured and uploaded to `public_html`. This project does not currently include one.

That's it! Your FIDIPA static website should now be live on your cPanel hosting.
