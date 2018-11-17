import { Component, HostBinding } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from './_services/storage.service';
import { MatDialog } from '@angular/material';
import { AuthService } from './_services/auth.service';
import { ThemeDialogComponent } from './theme-dialog/theme-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Zephyr';
  @HostBinding('class') componentCssClass;
  themes: string[] = ['my-light-theme', 'my-dark-theme', 'my-theme'];
  lastUrl: any;

  constructor(
    public overlayContainer: OverlayContainer,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
    public dialog: MatDialog) {

  }
  selectTheme(theme: string = null) {
    let selectedTheme = 'dark-deep-purple-theme';
    if (theme != null) {
      selectedTheme = theme;
    }

    this.applyTheme(selectedTheme);
    this.storageService.theme = selectedTheme;
  }

  applyTheme(theme: string) {
    this.componentCssClass = theme;
    const classList = this.overlayContainer.getContainerElement().classList;
    const toRemove = Array.from(classList).filter((item: string) =>
      item.includes('-theme')
    );
    if (toRemove && toRemove.length > 0) {
      classList.remove(...toRemove);
    }

    classList.add(theme);
  }

  isUserLoggedIn() {
    if (this.storageService.currentUser && this.storageService.token) {
      return true;
    } else {
      return false;
    }
  }
  getCurrentUserName() {
    if (this.storageService.currentUser) {
      return this.storageService.currentUser.firstName + ' ' + this.storageService.currentUser.lastName;
    }
  }

  getCurrentUserImage() {
    if (this.storageService.currentUser) {
      return this.storageService.currentUser.imageUrl;
    }
  }

  logout() {
    this.authService.logout();
    if (this.isAuthGuardPresent(this.lastUrl)) {
      this.router.navigateByUrl('');
    }
  }

  isAuthGuardPresent(url: string): boolean {
    url = url.toLocaleLowerCase();
    if (url.startsWith('/users') ||
      url.startsWith('/polls/create') ||
      url.startsWith('/mypolls')) {
      return true;
    } else {
      return false;
    }
  }

  async viewTheme() {
    const dialogRef = this.dialog.open(ThemeDialogComponent);

    const result = await dialogRef.afterClosed().toPromise();
    if (result) {
      this.applyTheme(result);
    }
  }
}
