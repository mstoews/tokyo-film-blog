import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { MatDrawer } from '@angular/material/sidenav'
import { FormBuilder, FormGroup } from '@angular/forms'
import { DndComponent } from 'app/components/loaddnd/dnd.component'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Contact } from 'app/models/contact'
import { ContactService } from 'app/services/contact.service'

@Component({
  selector: 'contact-list',
  templateUrl: './contact-grid.component.html',
  styleUrls: ['./contact-grid.component.css'],
})
export class ContactGridComponent implements OnInit {
  @ViewChild('drawer') drawer: MatDrawer
  drawOpen: 'open' | 'close' = 'open'
  contactGroup: FormGroup
  sTitle: string
  cRAG: string

  Contact: any
  collapsed = false

  allContacts$: Observable<Contact[]>
  selectedItemKeys: any

  constructor(
    private matDialog: MatDialog,
    private auth: AngularFireAuth,
    @Optional() @Inject(MAT_DIALOG_DATA) public parentId: string,
    private contactService: ContactService,
    private fb: FormBuilder
  ) {
    this.Contact = this.ContactType
  }

  ngOnInit() {
    this.Refresh()
    this.cRAG = '#238823'
  }

  contentReady = (e: any) => {
    if (!this.collapsed) {
      this.collapsed = true
      e.component.expandRow(['Id'])
    }
  }

  selectionChanged(data: any) {
    // console.log(`selectionChanged ${data}`);
    this.selectedItemKeys = data.selectedRowKeys
  }

  onImages() {
    // console.log('onImages');
    const parent = this.contactGroup.getRawValue()
    const dialogRef = this.matDialog.open(DndComponent, {
      width: '500px',
      data: parent.id,
    })

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === undefined) {
        result = { event: 'Cancel' }
      }
      switch (result.event) {
        case 'Create':
          // console.log(`create Images to save: ${JSON.stringify(result.data)}`);
          this.create(result)
          break
        case 'Cancel':
          // console.log(`Image transfer cancelled`);
          break
      }
    })
  }

  create(data: any) {
    const rawData = this.contactGroup.getRawValue()
    this.contactService.update(rawData)
  }

  onCellDoublClicked(e: any) {
    this.contactGroup.setValue(e.data)
    this.openDrawer()
  }

  onNotify(event: any) {
    this.contactGroup.setValue(event.data)
    this.toggleDrawer()
  }

  onFocusedRowChanged(e: any) {
    const rowData = e.row && e.row.data
    // console.log(`onFocusRowChanged ${JSON.stringify(rowData)}`);
    this.contactGroup.setValue(rowData)
    this.openDrawer()
  }

  openDrawer() {
    const opened = this.drawer.opened
    if (opened !== true) {
      this.drawer.toggle()
    } else {
      return
    }
  }

  closeDrawer() {
    const opened = this.drawer.opened
    if (opened === true) {
      this.drawer.toggle()
    } else {
      return
    }
  }

  Add() {
    // console.log('open drawer to add ... ');
    this.openDrawer()
  }

  Delete() {
    // console.log('open drawer to delete ... ');
    this.openDrawer()
  }

  Clone() {
    // console.log('open drawer to clone ... ');
    this.openDrawer()
  }

  Refresh() {
    this.sTitle = 'Contact Lists'
    this.createEmptyForm()
    this.allContacts$ = this.contactService.getAll()
  }

  onCreate() {
    const newContact = { ...this.contactGroup.value } as Contact
    this.contactService.create(newContact)
  }

  toggleDrawer() {
    const opened = this.drawer.opened
    if (opened !== true) {
      this.drawer.toggle()
    } else {
      if (this.drawOpen === 'close') {
        this.drawer.toggle()
      }
    }
  }

  dateFormatter(params: any) {
    const dateAsString = params.value
    const dateParts = dateAsString.split('-')
    return `${dateParts[0]} - ${dateParts[1]} - ${dateParts[2].slice(0, 2)}`
  }

  onUpdate(data: Contact) {
    data = this.contactGroup.getRawValue()

    // console.log(`onUpdate: ${JSON.stringify(data)}`);
    this.contactService.update(data)
  }

  onDelete(data: Contact) {
    data = this.contactGroup.getRawValue()
    // console.log(`onDelete: ${data}`);
    this.contactService.delete(data.id)
  }

  closeDialog() {
    this.drawer.toggle()
  }

  public ContactType = {
    name: '',
  }

  createEmptyForm() {
    this.contactGroup = this.fb.group({
      id: [''],
      name: [''],
    })
  }
  createForm(contact: Contact) {
    this.sTitle = 'Contact'

    this.contactGroup = this.fb.group({
      id: [contact.id],
      name: [contact.name],
      email: [contact.email],
      message: [contact.message],
    })
  }
}
