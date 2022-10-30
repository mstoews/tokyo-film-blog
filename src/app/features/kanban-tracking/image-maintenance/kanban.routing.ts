
import { Route } from '@angular/router';
import { CanDeactivateTasksDetails } from './kanban.guards';
import { TasksResolver, TasksTagsResolver, TasksTaskResolver } from './tasks.resolvers';
import { TasksComponent } from './tasks.component';
import { TasksListComponent } from './list/list.component';
import { TasksDetailsComponent } from './details/details.component';

export const tasksRoutes: Route[] = [
    {
        path     : '',
        component: TasksComponent,
        resolve  : {
            tags: TasksTagsResolver
        },
        children : [
            {
                path     : '',
                component: TasksListComponent,
                resolve  : {
                    tasks: TasksResolver
                },
                children : [
                    {
                        path         : ':id',
                        component    : TasksDetailsComponent,
                        resolve      : {
                            task: TasksTaskResolver
                        },
                        canDeactivate: [CanDeactivateTasksDetails]
                    }
                ]
            }
        ]
    }
];
