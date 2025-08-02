import { Task } from '../../models/task.models'

export const tasks : Task[] = [
    {
        id:'1',
        name: "Chi",
        from: "Ben",
        title:"Task eins",
        status: 'complete',
        checked: true
    },
    {
        id:'2',
        name: "Ben",
        from: "Ben",
        title:"Task zwei",
        status: 'complete',
        checked: true
    },
    {
        id:'3',
        name: "Satan",
        from: "Chi",
        title:"Task drei muss cih mal erledigen",
        status: 'incomplete',
        checked: false
    },
    {
        id:'4',
        name: "Ben",
        from: "Chi",
        title:"Task vier",
        status: 'complete',
        checked: true
    },
    {
        id:'5',
        name: "Ben",
        from: "Ben",
        title:"Task fünf",
        status: 'incomplete',
        checked: false
    },
    {
        id:'6',
        name: "Ben",
        from: "Ben",
        title:"Task sechs",
        status: 'incomplete',
        checked: false
    },
    {
        id:'7',
        name: "Chi",
        from: "Chi",
        title:"Task sieben",
        status: 'incomplete',
        checked: false
    }
]