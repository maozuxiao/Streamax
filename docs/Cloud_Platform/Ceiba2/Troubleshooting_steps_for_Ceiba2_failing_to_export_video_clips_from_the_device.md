# Troubleshooting steps for Ceiba2 failing to export video clips from the device

[TOC]

## Prerequisites

> [Click here to download the `DebugView` software](https://github.com/maozuxiao/Streamax/raw/refs/heads/main/assets/DebugView.zip )

## Troubleshooting Steps

### Collect Logs

1. Open Task Manager and locate the PID corresponding to `CEIBA2.exe`
   ![Ceiba_PID](https://cdn.jsdelivr.net/gh/maozuxiao/Steamax_IMG/image-20260106170433272.png )

2. Open `Dbgview.exe` and search for the PID found in the previous step

   ![Dbgview.exe](https://cdn.jsdelivr.net/gh/maozuxiao/Steamax_IMG/image-20260106170734087.png )

3. Reproduce the issue: Perform the video clip export operation in Ceiba2

4. Save the logs and provide them to R&D for analysis
   ![Save Logs](https://cdn.jsdelivr.net/gh/maozuxiao/Steamax_IMG/image-20260106170931820.png )

### Analysis and Solutions

#### Scenario 1: License Plate Name Contains Special Characters

##### Log Analysis

1. Search for the license plate number keyword of the exported video (e.g., `4513`) to locate the following log
   ```log
   {"KEY":"DOWNLOADVIDEO","PARAM":{"APPEND":1,"DEVFILENAME":"0-0-296","ENDTIME":"20260106114538","HDEV":13,"SAVEFILENAME":"C:/DEBUG//JB \t4513/2026-01-06/record/JB \t451300000000-260106-114338-114538-01p011000296.264","STARTTIME":"20260106114338"}}
   ```

   
2. Inspection reveals that the original license plate "JB 4513" has become "JB \t4513", where `\t` is a Tab character. Export will fail if the export path contains special characters

##### Solution

1. Log in to the web interface and modify the license plate to the correct format
   ![modify plate no](https://cdn.jsdelivr.net/gh/maozuxiao/Steamax_IMG/image-20260106171601718.png )
2. Log in to the Ceiba2 desktop client again, re-export the video clip, and confirm that the issue has been resolved