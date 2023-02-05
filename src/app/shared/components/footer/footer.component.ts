import { Component, OnInit } from "@angular/core";
import { Social, SOCIAL_URLS } from "../../models/social.model";

@Component({
  selector: "my-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  mail: string = "io@federicolorrai.it";
  Social = Social;

  constructor() {}

  ngOnInit(): void {}

  openSocial(s: Social) {
    const url = SOCIAL_URLS[s];
    if (url) window.open(url, "_blank");
  }
}
