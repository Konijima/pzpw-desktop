const { homedir } = require('os');
const { ipcMain, dialog, BrowserWindow } = require('electron');
const { join, resolve, dirname } = require('path');
const { readFile, writeFile, mkdir } = require('fs/promises');

const settingPath = join(homedir(), '.pzpw', 'pzpw-desktop-settings.json');

let projects = [];
let settings = {
    projectPaths: []
};

async function load() {    
    projects = [];
    
    await readFile(settingPath, 'utf-8')
        .then(s => settings = JSON.parse(s))
        .catch(() => { /** silent fail */ });

    for (const projectPath of settings.projectPaths) {
        await processProject(projectPath)
            .then((project) => {
                projects.push(project);
            })
            .catch(() => { /** ignore */ });
    }
}

async function save() {
    const json = JSON.stringify(settings, null, 2);
    await mkdir(dirname(settingPath), { recursive: true });
    await writeFile(settingPath, json, 'utf-8');
}

async function processProject(dirPath) {
    let packageJson = {};
    let pzpwConfigJson = {};

    try {
        await readFile(join(dirPath, 'package.json'), 'utf-8')
            .then((content) => {
                packageJson = JSON.parse(content);
            });
    
        await readFile(join(dirPath, 'pzpw-config.json'), 'utf-8')
            .then((content) => {
                pzpwConfigJson = JSON.parse(content);
            });
    }
    catch(_) {
        return;
    }

    return {
        filePath: resolve(dirPath),
        packageJson,
        pzpwConfigJson
    }
}

// requestProjects
ipcMain.handle('requestProjects', async () => {
    await load();
    return projects;
});

// openProject
ipcMain.handle('openProject', async () => {
    const selections = dialog.showOpenDialogSync(BrowserWindow.getFocusedWindow(), {
        title: 'Open a PZPW Project',
        buttonLabel: 'Open',
        properties: ['openDirectory']
    });

    if (selections && selections.length > 0) {
        if (!projects.find(p => join(p.filePath) === join(selections[0]))) {
            const project = await processProject(selections[0]);
            if (project) {
                projects.push(project);
                settings.projectPaths.push(join(selections[0]));
                await save();
                console.log("PZPW Project added succesfully!");
                return project;
            }
            else dialog.showErrorBox('Error', 'Directory is not a PZPW Project!');
        }
    }
});
