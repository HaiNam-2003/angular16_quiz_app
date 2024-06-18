import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { navbarData } from './nav-data';
import { SideNavToggle } from '../interface/sidenav';
import { AuthService } from '../services/auth/auth.service';
import { QuizService } from '../services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  @Output() showHistoryScreen = new EventEmitter();

  collapsed = false;
  screenWidth = 0;
  navData = navbarData;

  constructor(
    private authService: AuthService,
    private quizService: QuizService,
    private router: Router
  ) {}

  showHistory() {
    this.showHistoryScreen.emit(true);
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
    this.router.navigate(['/home']);
  }

  closeSideNav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  handleMenuClick(data: any): void {
    if (data === 'Logout') {
      this.authService.logout();
      this.closeSideNav();
    } else if (data == 'History') {
      this.showHistory();
    }
  }
}
