import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { PolicyDocuments } from 'app/models/policy-documents';
import { imageItem } from 'app/models/imageItem';
import { Observable } from 'rxjs';
import { PolicyService } from 'app/services/policy.service';

@Component({
  selector: 'policy-preview',
  templateUrl: './policy-preview.component.html',
  styleUrls: ['./policy-preview.component.css'],
})

export class PolicyPreviewComponent implements OnInit {
  inventoryImages$: Observable<imageItem[]>;
  @Input() policy: PolicyDocuments;
  images: imageItem[]=[];
  mainImage: string;

  constructor(private policyService: PolicyService){ }

  setImage(e: string) {
    this.mainImage = e;
  }

  ngOnInit() {

    if(this.policy.id){
      this.policyService.findPolicyByUrl(this.policy.id).subscribe(policy => {
        this.policy = policy;
      })
    }
  }
}

